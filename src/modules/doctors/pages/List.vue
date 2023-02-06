<template>
    <h1>Listado de Doctores</h1>
  <a-button class="editable-add-btn" type="primary" style="margin-bottom: 8px" @click="mapShowModal">Agregar Registro</a-button>
  <a-table bordered :data-source="doctors" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'clinicsName'">
        <p v-for="clinic in record.clinicsName" :key="clinic">
            {{ clinic }}
        </p>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-tooltip title="Editar">
            <a-button type="primary" size="small" @click="edit(record.id)">
                <template #icon>
                    <EditOutlined />
                </template>
            </a-button>
        </a-tooltip>
        <a-tooltip title="Ver detalle">
            <a-button type="primary" size="small">
                <template #icon>
                    <EyeOutlined />
                </template>
            </a-button>
        </a-tooltip>
        <a-tooltip title="Agendar cita">
            <a-button type="primary" size="small">
                <template #icon>
                    <ScheduleOutlined />
                </template>
            </a-button>
        </a-tooltip>
        <a-popconfirm
          v-if="doctors.length"
          title="Esta seguro de eliminar este doctor?"
          @confirm="onDelete(record.id)"
        >
            <a-tooltip title="Borrar">
                <a-button type="primary" danger size="small">
                    <template #icon>
                        <DeleteOutlined />
                    </template>
                </a-button>
            </a-tooltip>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <CreateDoctor v-if="modal" @new-data="addNew" :edit-data="selectedDoctor" :mode="mode"/>
</template>

<script>
import { defineComponent, isProxy, toRaw } from 'vue'
import { mapState, mapActions } from "vuex";
import CreateDoctor from '../components/CreateDoctor.vue'
import { DeleteOutlined, EditOutlined, EyeOutlined, ScheduleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default defineComponent({
    components: {
        CreateDoctor,
        DeleteOutlined,
        EditOutlined,
        EyeOutlined,
        ScheduleOutlined,
        message,
    },
    data() {
        return {
            doctors: [],
            columns: [
                {
                title: 'Nombre del doctor',
                dataIndex: 'fullname',
                width: '30%',
                },
                {
                title: 'Especialidad',
                dataIndex: 'especialidad',
                },
                {
                title: 'Centros Clinicos',
                dataIndex: 'clinicsName',
                },
                {
                title: 'Horarios disponibles',
                dataIndex: 'fecha',
                },
                {
                title: 'Acciones',
                dataIndex: 'operation',
                },
                ],
            selectedDoctor: {},
            modal: false,
            mode: 'create',
        }
    },
    computed: {
        ...mapState('doctors', ['doctorsList','clinicsList']),
        count() {
            return this.doctors.length + 1
        },
    },
    async created () {
        await this.mapClinics()
        await this.mapDoctors()
    },
    methods: {
        ...mapActions('doctors', ['getDoctors', 'deleteDoctor', 'setShowModal', 'getClinics']),
        handleAdd() {
            const newData = {
                id: `${this.count}`,
                fullname: '',
                especialidad: ''
            };
            this.doctors.push(newData);
        },
        edit(id) {
            this.mode = 'edit'
            this.selectedDoctor = toRaw(this.doctors.filter(item => id === item.id)[0])
            this.setShowModal(true)
            this.modal = true
        },
        async mapClinics() {
            await this.getClinics()
            if (isProxy(this.clinicsList)) {
            this.clinics = toRaw(this.clinicsList)
            }
        },
        async onDelete(id) {
            await this.deleteDoctor(id)
            this.mapDoctors()
            this.doctors = this.doctors.filter(item => item.id !== id);
            message.info('Registro Eliminado')
        },
        async mapDoctors() {
            if (isProxy(this.doctorsList)) {
                if (toRaw(this.doctorsList).length === 0) {
                    await this.getDoctors()
                }
                this.doctors = toRaw(this.doctorsList)
                const clinics = toRaw(this.clinics)
                this.doctors.forEach(doctor => {
                    doctor = toRaw(doctor)
                    doctor.clinicsName = []
                    doctor.clinic_ids = JSON.parse(doctor.clinic_ids)
                    doctor.clinic_ids.forEach(clinic => {
                        const match = clinics.find( c => c.id === clinic)
                        if (match) {
                            doctor.clinicsName.push(match.name)
                        }
                    })
                })
            }
        },
        mapShowModal() {
            this.modal = true
            this.setShowModal(true)
        },
        addNew(data) {
            if (this.mode === 'edit') {
                const index = this.doctors.findIndex(d => d.id === data.id)
                if (index > -1) {
                    this.doctors[index] = data
                }
            } else {
                this.doctors.push(data)
            }
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
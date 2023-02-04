<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="mapShowModal">Add</a-button>
  <a-table bordered :data-source="doctors" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'fullname'">
        <div class="editable-cell">
          <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.id].fullname" @pressEnter="save(record.id)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
          v-if="doctors.length"
          title="Sure to delete?"
          @confirm="onDelete(record.id)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <CreateDoctor @new-data="addNew"/>
</template>

<script>
import { defineComponent, isProxy, toRaw } from 'vue'
import { mapState, mapActions } from "vuex";
import CreateDoctor from '../components/CreateDoctor.vue'

export default defineComponent({
    // async setup () {
    //     const { doctors } = useDoctors()
    //     console.log(doctors.value)
    
    //     return {
    //         doctors,
    //     }
    // },
    components: {
        CreateDoctor,
    },
    data() {
        return {
            doctors: [],
            columns: [{
                title: 'Nombre del doctor',
                dataIndex: 'fullname',
                width: '30%',
                }, {
                title: 'Especialidad',
                dataIndex: 'especialidad',
            }, {
            title: 'operation',
            dataIndex: 'operation',
            }],
            editableData: {},
        }
    },
    computed: {
        ...mapState('doctors', ['doctorsList']),
        count() {
            return this.doctors.length + 1
        },
    },
    created () {
        this.mapDoctors()
    },
    methods: {
        ...mapActions('doctors', ['getDoctors', 'deleteDoctor', 'setShowModal']),
        handleAdd() {
            const newData = {
                id: `${this.count}`,
                fullname: '',
                especialidad: ''
            };
            this.doctors.push(newData);
        },
        edit(id) {
            this.editableData[id] = this.doctors.filter(item => id === item.id)[0]
        },
        async onDelete(id) {
            await this.deleteDoctor(id)
            this.mapDoctors()
            this.doctors = this.doctors.filter(item => item.id !== id);
        },
        async mapDoctors() {
            if (isProxy(this.doctorsList)) {
                if (toRaw(this.doctorsList).length === 0) {
                    await this.getDoctors()
                }
                this.doctors = toRaw(this.doctorsList)
            }
        },
        mapShowModal() {
            console.log('aqui')
            this.setShowModal(true)
        },
        addNew(data) {
            this.doctors.push(data)
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
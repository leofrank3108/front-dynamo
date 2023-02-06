<template>
  <div>
    <a-modal v-model:visible="showModal" width="1000px" title="Registro de doctores" @ok="handleOk" :closable="true">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancelar</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">Guardar</a-button>
      </template>
      <a-form
        :model="form"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onSubmit"
      >
        <a-form-item name="fullname" label="Name" :rules="[{ required: true }]">
          <a-input v-model:value="form.fullname" />
        </a-form-item>
        <a-form-item name="especialidad" label="Especialidad" :rules="[{ required: true }]">
          <a-input v-model:value="form.especialidad" />
        </a-form-item>
        <a-form-item name="defaultClinics" label="Clinicas">
          <a-select
            v-model:value="defaultClinics"
            mode="tags"
            style="width: 100%"
            placeholder="Seleccione las clinicas"
          >
            <a-select-option v-for="(clinic, index) in clinics" :key="index" :value="clinic.id" :label="clinic.name">
              {{ clinic.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item :name="['user', 'website']" label="Website">
          <a-input v-model:value="formState.user.website" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="Introduction">
          <a-textarea v-model:value="formState.user.introduction" />
        </a-form-item> -->
        <!-- <a-form-item>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, isProxy, toRaw } from 'vue';
import { mapState, mapActions } from 'vuex'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    message,
  },
  data() {
    return {
      form: {
        fullname: '',
        especialidad: '',
        clinic_ids: null,
        },
        clinics: [],
        defaultClinics: [],
      }
    },
    props: {
      editData: {
        type: Object,
        default: {}
      },
      mode: {
        type: String,
        default: 'create'
      }
    },
    computed: {
       ...mapState('doctors', ['showModal', 'clinicsList'])
    },
    async created () {
      await this.mapClinics()
      if (this.mode === 'edit') {
        this.setFormData(toRaw(this.editData))
      }
    },
    methods: {
      ...mapActions('doctors', ['setShowModal', 'createDoctor', 'getDoctors', 'getClinics', 'updateDoctor']),
      async handleOk(e) {
        this.clearForm()
        this.setShowModal(false)
      },
      handleCancel() {
        this.setShowModal(false)
      },
      setFormData(data) {
        const clinics = toRaw(this.clinics)
        data.clinic_ids.forEach(id => {
          const match = clinics.find(clinic => clinic.id === id)
          if (match) {
            this.defaultClinics.push({
              value: match.id,
              label: match.name,
            })
          }
        });
        this.form = data
      },
      async mapClinics() {
        await this.getClinics()
        if (isProxy(this.clinicsList)) {
          this.clinics = toRaw(this.clinicsList)
        }
      },
      async onSubmit() {
        let c = []
        let clinics = toRaw(this.defaultClinics)
        clinics.forEach(clinic => {
          c.push(clinic)
        });
        this.form.clinic_ids = c
        if (this.mode === 'create') {
          const { fullname, especialidad, clinic_ids } = await this.createDoctor(this.form)
          const newData = {
            fullname,
            especialidad,
            clinic_ids,
          }
          this.$emit('newData', newData)
          message.info('Informacion guardada con exito')
        } else {
          const { id, fullname, especialidad, clinic_ids } = await this.updateDoctor(this.form)
          const newData = {
            id,
            fullname,
            especialidad,
            clinic_ids,
          }
          this.$emit('newData', newData)
          message.info('Informacion actualizada con exito')
        }
        this.clearForm()
        await this.getDoctors()
        this.setShowModal(false)
      },
      clearForm() {
        this.form = {
            fullname: '',
            especialidad: '',
            clinic_ids: []
          }
      },
    },
});
</script>
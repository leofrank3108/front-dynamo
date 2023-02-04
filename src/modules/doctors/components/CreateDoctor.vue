<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">Open Modal of 1000px width</a-button> -->
    <a-modal v-model:visible="showModal" width="1000px" title="Basic Modal" @ok="handleOk">
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
        <!-- <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
          <a-input-number v-model:value="formState.user.age" />
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="Website">
          <a-input v-model:value="formState.user.website" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="Introduction">
          <a-textarea v-model:value="formState.user.introduction" />
        </a-form-item> -->
        <a-form-item>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { mapState, mapActions } from 'vuex'
export default defineComponent({
//   setup() {
//     const visible = ref(false);
//     const showModal = () => {
//       visible.value = true;
//     };
//     const handleOk = e => {
//       console.log(e);
//       visible.value = false;
//     };
//     return {
//       visible,
//       showModal,
//       handleOk,
//     };
//   },
    data() {
      return {
        form: {
          fullname: '',
          especialidad: '',
        },
      }
    },
    computed: {
       ...mapState('doctors', ['showModal'])
    },
    created () {
      console.log('component')
      console.log(this.showModal)
    },
    methods: {
      ...mapActions('doctors', ['setShowModal', 'createDoctor', 'getDoctors']),
      async handleOk(e) {
        this.setShowModal(false)
      },
      async onSubmit() {
        const { fullname, especialidad } = await this.createDoctor(this.form)
        const newData = {
          fullname,
          especialidad
        }
        this.$emit('newData', newData)
        await this.getDoctors()
        this.setShowModal(false)
      }
    },
});
</script>
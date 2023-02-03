<template>
    <div>
        <button type="submit" class="btn btn-primary" @click="$emit('on:click')">{{ label }}</button>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
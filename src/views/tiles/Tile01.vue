<template>
    <Tile title="Tile01" size="tile1x1" :draggable="true" >
        <!-- <template #title>
            타이틀
        </template>
        <template #body>
            바디
        </template> -->
    </Tile>
</template>

<script>
    import Tile from './Tile.vue';

    export default {
        components: {
            Tile,
        },
    }
</script>

<style scoped>
</style>
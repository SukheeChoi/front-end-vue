<template>
    <Tile title="Tile02" 
        :draggable="true" 
        :style="'width: calc(25% - 2px); height:40vh;'">
        <h3>Profit for</h3>
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
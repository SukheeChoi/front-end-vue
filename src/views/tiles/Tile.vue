<template>
    <div
            class="tile"
            :id="size"
            :draggable="draggable"
            @dragstart="$emit('drag-start', $event)"
            @dragover="$emit('drag-over', $event)"
            @drop="$emit('drag-finish', $event)"
            @dragend="$emit('drag-end', $event)"
    >
        <!-- caption -->
        <div class="ow-panel-header">
            <div class="ow-panel-title">{{title}}</div>
        </div>
        <!-- content -->
        <div class="ow-panel-body">
            <slot />
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },
        props: {
            title: String,
            size: String,
            draggable: Boolean
        },
        emits: [
            'drag-start',
            'drag-over',
            'drag-finish',
            'drag-end',
        ],
    }
</script>

<style scoped>
</style>

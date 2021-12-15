<template>
    <div class="ow-panel">
        <div class="dashboard">
            <component v-for="tile in tiles"
                    :key="tile.id"
                    :is="tile.type"
                    @remove-tile="$emit('remove-tile', tile.id)"
                    @drag-start="$emit('drag-start', {event: $event, tileId: tile.id})"
                    @drag-over="$emit('drag-over', {event: $event, tileId: tile.id})"
                    @drag-finish="$emit('drag-finish', {event: $event, tileId: tile.id})"
                    @drag-end="$emit('drag-end', {event: $event, tileId: tile.id})"
            >
            </component>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'tiles'
        ],
        components: {
        },
      emits: [
        'drag-start',
        'drag-over',
        'drag-finish',
        'drag-end',
        'remove-tile',
      ],
      created() {
          for (const tile of this.tiles) {
            this.$options.components[tile.type] = require(`./tiles/${tile.type}`).default || require(`./tiles/${tile.type}`);
          }
      },
    }
</script>

<style>
    .button {
        cursor: pointer;
    }

    .dashboard {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* margin: auto; */
        height: 100%;
    }

    .tile {
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;
        /* margin: 0.5rem; */
        /* width: calc(25% - 1rem); */
        /* height: 50vh;
        max-height: calc(50% - 1rem); */
        overflow: hidden;
        page-break-inside: avoid; /* important when printing the dashboard */
        transition: all 250ms;
        box-sizing: border-box;
        margin-bottom: 4px;
    }

    #tile3x1 {
        width: calc(75% - 2px);
        height: 40vh;
        max-height: calc(50%);
    }
    #tile2x1 {
        width: calc(50% - 2px);
        height: 40vh;
        max-height: calc(50%);
    }
    #tile1x1 {
        width: calc(25% - 2px);
        height: 40vh;
        max-height: calc(50%);
    }

    @media only screen and (max-width: 1599px) {
        .tile {
            width: calc(33.33% - 1rem);
        }
    }
    @media only screen and (max-width: 1079px) {
        .tile {
            width: calc(50% - 1rem);
        }
    }
    @media only screen and (max-width: 1023px) {
        .tile {
            width: calc(100% - 1rem);
        }
    }
    @media only screen and (max-height: 800px) {
        .tile {
            max-height: 400px;
        }
    }
    /* .tile:last-child {
        flex: 1 1 auto;
    } */
    .tile:hover {
        border-color: #adb7bd;
    }
    .tile.drag-over {
        border: 2px dashed #000;
    }
    .tile .buttons {
        transition: all 250ms;
        opacity: 0;
    }
    @media (hover: none) and (pointer: coarse) {
        .tile .buttons {
            opacity: 1;
        }
    }
    .tile:hover .buttons {
        opacity: 1;
    }
    .tile .buttons > span {
        padding: 0 0.5rem;
        cursor: pointer;
    }
    .tile.drag-over {
        border: 1px dashed #000;
        background-color: rgba(0, 0, 0, 0.1);
        transition: all 250ms;
    }
    .tile.drag-source {
        opacity: 0.4;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background-color: rgba(145, 200, 248, 0.75);
        transform: scale(0.9);
        transition: all 250ms;
    }

</style>

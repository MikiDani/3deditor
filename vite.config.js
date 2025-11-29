export default {
    base: './',
    server: {
        port: 5174
    },
    build: {
        chunkSizeWarningLimit: 1000,    // kB
        rollupOptions: {
            output: {
                manualChunks: {
                    game: ['./js/game.js'],
                    gameGraphics: ['./js/game-graphics.js'],
                    gameplay: ['./js/gameplay.js'],
                    input: ['./js/input.js'],
                    inventory: ['./js/inventory.js'],
                    loader: ['./js/loader.js'],
                    menu: ['./js/menu.js'],
                    sound: ['./js/sound.js']
                }
            }
        }
    }
};
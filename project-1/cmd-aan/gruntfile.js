module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.initConfig({
        uglify: {
            build: {
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: '_/js',
                    cwd: '_/components/js'
                }]
            }
        },
        compass : {
            dev : {
                options: {
                    config : 'config.rb'
                } //options
            } //dev
        }, //compass
        watch: {
            scripts: {
                files: ['_/components/js/*.js'],
                tasks: ['uglify']
            }, //scripts
            sass: {
                files: ['_/components/sass/*.scss'],
                tasks: ['compass:dev']
            } //sass
        } //watch
    }) //initConfig
    grunt.registerTask('default', 'watch');
} // exports
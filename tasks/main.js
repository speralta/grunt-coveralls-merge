module.exports = function(grunt) {

  grunt.task.registerTask('coveralls_merge', 'Merge coveralls files and send it', function(){
    var done = this.async();
    var gruntOptions = grunt.config('coveralls_merge.options');
    process.env.NODE_COVERALLS_DEBUG = gruntOptions.debug ? 1 : 0;
    
    var coveralls = require('coveralls/index');
    coveralls.getBaseOptions(function(err, options){
      var postJson = {
        source_files : []
      };
      if (options.git){
        postJson.git = options.git;
      }
      if (options.run_at){
        postJson.run_at = options.run_at;
      }
      if (options.service_name){
        postJson.service_name = options.service_name;
      }
      if (options.service_job_id){
        postJson.service_job_id = options.service_job_id;
      }
      if (options.repo_token) {
        postJson.repo_token = options.repo_token;
      }
      gruntOptions.coveralls_files.forEach(function(file) {
        var content = JSON.parse(fs.readFileSync(file));
        postJson.source_files.push(content.source_files);
      });
      options.filepath = ".";
      if (!gruntOptions.dryRun) {
        coveralls.sendToCoveralls(postJson, function(err, response, body){
          if (err){
            done();
            throw err;
          }
          if (response.statusCode >= 400){
            handleError(done, "Bad response:" + response.statusCode + " " + body);
          }
          done();
        });
      } else {
        fs.writeFileSync(gruntOptions.coverage_dir + '/coveralls-merged.json', JSON.stringify(postJson));
      }
    });
  });
  
};

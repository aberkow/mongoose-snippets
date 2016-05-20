var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(err){
  console.error('Could not connect. Error:', err);
});

mongoose.connection.once('open', function(){
  var snippetSchema = mongoose.Schema({
    name: {type: String, unique: true},
    content: String
  });
  var Snippet = mongoose.model('Snippet', snippetSchema);

  var create = function(name, content){
    var snippet = {
      name: name,
      content: content
    };
    console.log(snippet);
    debugger;
    Snippet.create(snippet, function(err, snippet){
      if (err || !snippet){
        console.error("Could not create snippet", name);
        mongoose.disconnect();
        return;
      }
      console.log("created snippet", snippet.name);
      mongoose.disconnect();
    });
  };

  var read = function(name){
    Snippet.findOne({name: name}, function(err, snippet){
      if (err || !snippet){
        console.error("Could not read snippet", name);
        mongoose.disconnect();
        return;
      }
      console.log("Read snippet", snippet.name);
      console.log(snippet.content);
      mongoose.disconnect();
    });
  };

  var update = function(name, content){
    Snippet.findOneAndUpdate({name: name}, {content: content}, function(err, snippet){
      if (err || !snippet){
        console.error("Could not update snippet", name);
        mongoose.disconnect();
        return;
      }
      console.log("Updated snippet", snippet.name);
      mongoose.disconnect();
    });
  };

  var del = function(name, content){
    Snippet.findOneAndRemove({name: name}, function(err, snippet){
      if (err || !snippet){
        console.error("Could not delete snippet", name);
        mongoose.disconnect();
        return;
      }
      console.log('Deleted snippet', snippet.name);
      mongoose.disconnect();
    });
  };

  //process.argv - an array containing command line arguments.
  //0 - 'node'
  //1 - nameOfJSFile
  //2 - n - additional arguments

  //complains that Snippet is undefined.
  var main = function(){
    if (process.argv[2] == 'create'){
      create(process.argv[3], process.argv[4]);
    }
    else if (process.argv[2] == 'read'){
      read(process.argv[3]);
    }
    else if (process.argv[2] == 'update'){
      update(process.argv[3], process.argv[4]);
    }
    else if (process.argv[2] == 'delete'){
      del(process.argv[3]);
    }
    else {
      console.error('Command not recognized');
      mongoose.disconnect();
    }
  };
  main();
  console.log('connected to mongodb via mongoose');
});


//main();

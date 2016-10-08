require('./build-pipeline')
  .build(err => {
  if(err)
    console.log(err)
  else
    console.log('Site build complete!');
  });

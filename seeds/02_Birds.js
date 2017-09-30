exports.seed = function seed( knex, Promise ) {
  
      var tableName = 'birds';
  
      var rows = [
  
          {
              owner: 1,
              species: 'Columbidae',
              name: 'Pigeon',
              picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
              isPublic: true,
          },
  
          {
              owner: 1,
              species: 'Zenaida',
              name: 'Mourning dove',
              picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/220px-Mourning_Dove_2006.jpg',
              isPublic: false,
          },
  
      ];
  
      return knex( tableName )
          .del()
          .then( function() {
              return knex.insert( rows ).into( tableName );
          });
  
  };
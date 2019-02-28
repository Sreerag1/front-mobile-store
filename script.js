$(document).ready(function(){
  var mobileList;
  loadMobiles();
  function loadMobiles(argument) {
      $.getJSON( "data.json", function( data ) {
        data = data.mobiles;
        mobileList = data;
        $.each( data, function( key, val ) {
                var card = '<div class="col-sm-6 col-md-4 col-lg-3">'+
                  '<div class="thumbnail mobile-card" '+
                  'data-manufacturer="'+val.manufacturer+'"'+
                  'data-storage="'+val.storage+'"'+
                  'data-os="'+val.os+'"'+
                  'data-name="'+val.name+'"'+
                  'data-url="'+val.url+'"'+
                  'data-description="'+val.description+'">'+

                      '<div class="img-container">'+
                        '<img class="img-responsive2" src="'+val.url+'" alt="Lights" style="">'+
                      '</div>'+

                    '<div class="mobile-info">'+
                      '<h2>'+val.name+'</h2>'+
                      '<p><strong>Manufacturer:</strong>'+val.manufacturer+'</p>'+
                      '<p><strong>Storage:</strong>'+val.storage+'</p>'+
                      '<p><strong>OS:</strong>'+val.os+'</p>'+
                      '<h3 class="text-right price">Rs '+val.price+'</h3>'+
                    '</div>'+
                  '</div>'+
                '</div>';
          $("#mobiles-row").append(card);
          
          // end of loop
        }); 
        $(document).trigger('finished_loading');
        // end of getJSON
      });
  }
  //After loading the entire the mobiles
  $(document).on( "finished_loading", function() {
    equalizeHeight();
    setModalEventHandlers();
  });

  $("#clear-filter").on( "click",clearFilters);
  function clearFilters(argument) {
      $(".mobile-card").css("opacity", 1);
      $('#filter-container input[type=checkbox]').prop('checked', false);
  }
  $("#filter-container input[type=checkbox]").on( "click", function() {
      $checkbox = $(this);
      $(".mobile-card").css("opacity", .2);
      $("#filter-container input[type=checkbox]:checked").each(function(index, element){
        $("[data-"+this.name+"="+this.value+"]").css("opacity", 1);
      });
      if ($checkbox.is(":checked") == false) {
        if ($("input[type=checkbox]:checked").length == 0) {
          // if no checkbox is checked
          clearFilters();
        }
        //  else {
        //   // if hide the selected filter checkbox is unchecked
        //    $("[data-"+this.name+"="+this.value+"]").css("opacity", .2);
        //   console.log($checkbox.is(":checked"));          
        // }
      }

  });
  // equal the card height
  function equalizeHeight() {
      var maxHeight = 0;
      $(".mobile-card").each(function(){
      if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
      });
      $(".mobile-card").height(maxHeight);          
  }
  function setModalEventHandlers() {
    $(".mobile-card").on("click", function(){
      $mobile = $(this);
      console.log($mobile.data("name"));
      $("#mobile-title").html($mobile.data("name"));
      $("#mobile-image").attr("src",$mobile.data("url"));
      $("#mobile-description").html($mobile.data("description"));
      modal.style.display = "block";
      console.log(this.src);
    });
  }

  // end of document ready
});

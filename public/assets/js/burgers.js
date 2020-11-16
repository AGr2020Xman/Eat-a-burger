$(() => {
    $(".submit-btn").on("click", (event) => {
      event.preventDefault();
  
      let newBurger = {
        name: $("#burger-name").val().trim(),
      };
      $("#burger-name").val("")
  
      // POST req
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger,
      }).then(() => {
        console.log("New burger ready for devouring!");
        
        location.reload();
      });
    });
  
    // devoured/not devoured toggle
    $(".is-devoured").on("click", (event) => {
      let id = $(event.currentTarget).data("id");
      let newDevoured = $(event.currentTarget).data("newdevoured");
  
      let newDevouredState = { devoured: newDevoured, };
  
      // PUT req
      $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: newDevouredState,
      }).then(() => {
        console.log('Updated to ', newDevoured);
        location.reload();
      });
    });
  
    $(".delete-burger").on("click", (event) => {
      let id = $(event.currentTarget).data("id");
  
      // DEL req
      $.ajax(`/api/burgers/${id}`, {
        type: "DELETE",
      }).then(() => {
          console.log("Waste of a burger...", id);
          location.reload();
      });
    });
  });
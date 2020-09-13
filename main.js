$(document).ready(function(){
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
  });
});


// $('#navbarDropdown').hover(
//   function(){ 
//     console.log("hov");
//     $('.dropdown-menu').toggleClass('show');
//   },
// )
//allow placeholder values for select forms
$( function () {
  $("body").on("change", "select", function (event) {
    $("select").on("change", function (event) {
      var disabled = false;
      $(event.currentTarget).find("option").each( function (i, option) {
        if (option.selected && $(option).is(".placeholder")) {
          disabled = true;
          $(event.currentTarget).addClass("select-disabled");
        }
      });
      if (!disabled) {
        $(event.currentTarget).removeClass("select-disabled");
      }
    });
  })
  
  $(".guest-button").on("click", function (event) {
    $("#user_username").val("kurtkotzur");
    $("#user_password").val("password");
  })
});
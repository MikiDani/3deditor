
// Responsite menu

$(document).on('click', ".menu-icon", function() {
    let id = $(this).closest('li').attr('data-id')
    
    if ($(this).hasClass('triangle-up')) {
        $(this).removeClass('triangle-up').addClass('triangle-down')
    } else if ($(this).hasClass('triangle-down')) {
        $(this).removeClass('triangle-down').addClass('triangle-up')
    }

    $(`ul[parent-id='${id}']`).slideToggle()
});
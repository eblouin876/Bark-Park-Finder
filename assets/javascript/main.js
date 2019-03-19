$(document).on('click', '.search-button', function () {
    console.log($($(this).attr('ref')).val())
})
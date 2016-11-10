$(function () {

    $('.button').each(function () {
        $('button', $(this))
            .on('click', function (event) {
                event.preventDefault();

                let $div = $('<div/>'),
                    btnOffset = $(this).offset(),
                    xPos = event.pageX - btnOffset.left,
                    yPos = event.pageY - btnOffset.top;

                $div.addClass('js-button__ripple-effect');
                $div.css({
                    top: yPos,
                    left: xPos
                });
                $div.appendTo($(this));

                window.setTimeout(function () {
                    $div.remove();
                }, 1000);
            })
            .on('mousedown', (event) => {
                $(this).addClass('button_pressed');
            })
            .on('mouseup', (event) => {
                $(this).removeClass('button_pressed');
            })
            .on('mouseout', (event) => {
                $(this).removeClass('button_pressed');
            });
    })

});
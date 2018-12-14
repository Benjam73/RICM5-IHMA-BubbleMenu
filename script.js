$(function () {

    $(document).mousemove(e => {
        var currentElem = $(e.target);

        if (currentElem.hasClass("menuitem")) {

            if (isLeftFromElem(e.pageX, currentElem)) {

                $('#bubble').hide();

                currentElem.click(function () {
                    $("#itemSelected").text(currentElem.text());
                });
            } else {

                currentElem.off('click');
                $('#bubble').show();

                var bubbleItems = currentElem.parent().parent().find('.bubbleitem');
                var closestBubbleItem = $(bubbleItems[0]);
                bubbleItems.each(function (index) {
                    if (Math.abs(e.pageY - $(this).offset().top) < e.pageY - closestBubbleItem.offset().top) {
                        closestBubbleItem = $(this);
                    }
                });
                var bubbleSize = Math.abs(e.pageY - closestBubbleItem.offset().top) * 1.5;


                $('#bubble').css({
                    width: bubbleSize + 'px',
                    height: bubbleSize + 'px',
                    left: e.pageX - bubbleSize / 3,
                    top: e.pageY - bubbleSize / 3
                });


                currentElem.click(() => {
                    $("#itemSelected").text(closestBubbleItem.text());
                });
            }
        } else {

            $('#bubble').hide();
        }
    });

    // Fonction qui calcule si la position x est localisée sur la moitié gauche de l'élement courant
    function isLeftFromElem(x, elem) {
        return x - elem.parent().offset().left < elem.outerWidth() / 2;
    }
});

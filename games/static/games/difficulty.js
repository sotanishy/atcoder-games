function getColor(rate) {
    let colors = [
        { color:'#808080', min:-10000, max:399  },
        { color:'#804000', min:400,    max:799  },
        { color:'#008000', min:800,    max:1199 },
        { color:'#00C0C0', min:1200,   max:1599 },
        { color:'#0000FF', min:1600,   max:1999 },
        { color:'#C0C000', min:2000,   max:2399 },
        { color:'#FF8000', min:2400,   max:2799 },
        { color:'#FF0000', min:2800,   max:9999 },
    ]
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].min <= rate && rate <= colors[i].max) {
            return colors[i].color;
        }
    }
    return '#000000';
}

$(document).ready(function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://kenkoooo.com/atcoder/resources/problem-models.json', true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);

            $('.game').each(function () {
                let problem_id = $(this).attr('data-problem');
                let diff = Math.round(json[problem_id]['difficulty']);
                let color = getColor(diff);
                $(this).find('.title').css('color', color);
                $(this).find('.diff').css('color', color).text(diff);
            });
        }
    };
    xhr.send();
});
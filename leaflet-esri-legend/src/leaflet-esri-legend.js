function Legend(url, name, x, y) {
    url = url + "/legend?f=pjson";
    name = name || "图例";
    x = x || 0;
    y = y || 0;
    if ($(".legend div") != null) {
        $(".legend div").remove();
    }
    $.ajax({
        type: "post",
        cache: false,
        url: url,
        success: function (res) {
            res = eval("(" + res + ")");
            var htms = "<div class='Lenged_css'>";
            var Name = name;
            htms += "<h5>" + Name + "</h5>";
            var length = res.layers.length;
            for (var i = 0; i < length+x; i++) {
                for (var j = 0; j < res.layers[i].legend.length+y; j++) {
                    var image = "data:image/png;base64," + res.layers[i].legend[j].imageData;
                    var layerName;
                    if(res.layers[i].legend[j].label!=""){
                        layerName=res.layers[i].legend[j].label;
                    }else {
                        layerName=res.layers[i].layerName
                    }

                    htms += "<div><img src=" + image + " />" + layerName + "</div>"
                }
            }
            htms += "</div>";
            var legend = L.control({position: 'bottomright'});
            legend.onAdd = function () {
                var div = L.DomUtil.create('div', 'legend_div');
                div.innerHTML += htms;
                return div;
            };
            legend.addTo(map);
        }
    })
}
﻿/*
  Highcharts JS v4.0.4 (2014-09-02)
 Solid angular gauge module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) {
    var k = a.getOptions().plotOptions, q = a.pInt, r = a.pick, l = a.each, n; k.solidgauge = a.merge(k.gauge, { colorByPoint: !0 }); n = {
        initDataClasses: function (b) { var h = this, e = this.chart, c, m = 0, f = this.options; this.dataClasses = c = []; l(b.dataClasses, function (g, d) { var i, g = a.merge(g); c.push(g); if (!g.color) f.dataClassColor === "category" ? (i = e.options.colors, g.color = i[m++], m === i.length && (m = 0)) : g.color = h.tweenColors(a.Color(f.minColor), a.Color(f.maxColor), d / (b.dataClasses.length - 1)) }) }, initStops: function (b) {
            this.stops =
            b.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; l(this.stops, function (b) { b.color = a.Color(b[1]) })
        }, toColor: function (b, h) {
            var e, c = this.stops, a, f = this.dataClasses, g, d; if (f) for (d = f.length; d--;) { if (g = f[d], a = g.from, c = g.to, (a === void 0 || b >= a) && (c === void 0 || b <= c)) { e = g.color; if (h) h.dataClass = d; break } } else {
                this.isLog && (b = this.val2lin(b)); e = 1 - (this.max - b) / (this.max - this.min); for (d = c.length; d--;) if (e > c[d][0]) break; a = c[d] || c[d + 1]; c = c[d + 1] || a; e = 1 - (c[0] - e) / (c[0] - a[0] || 1); e = this.tweenColors(a.color,
                c.color, e)
            } return e
        }, tweenColors: function (b, a, e) { var c = a.rgba[3] !== 1 || b.rgba[3] !== 1; return b.rgba.length === 0 || a.rgba.length === 0 ? "none" : (c ? "rgba(" : "rgb(") + Math.round(a.rgba[0] + (b.rgba[0] - a.rgba[0]) * (1 - e)) + "," + Math.round(a.rgba[1] + (b.rgba[1] - a.rgba[1]) * (1 - e)) + "," + Math.round(a.rgba[2] + (b.rgba[2] - a.rgba[2]) * (1 - e)) + (c ? "," + (a.rgba[3] + (b.rgba[3] - a.rgba[3]) * (1 - e)) : "") + ")" }
    }; a.seriesTypes.solidgauge = a.extendClass(a.seriesTypes.gauge, {
        type: "solidgauge", bindAxes: function () {
            var b; a.seriesTypes.gauge.prototype.bindAxes.call(this);
            b = this.yAxis; a.extend(b, n); b.options.dataClasses && b.initDataClasses(b.options); b.initStops(b.options)
        }, drawPoints: function () {
            var b = this, h = b.yAxis, e = h.center, c = b.options, m = b.chart.renderer; a.each(b.points, function (f) {
                var g = f.graphic, d = h.startAngleRad + h.translate(f.y, null, null, null, !0), i = q(r(c.radius, 100)) * e[2] / 200, o = q(r(c.innerRadius, 60)) * e[2] / 200, p = h.toColor(f.y, f), k; if (p !== "none") k = f.color, f.color = p; c.wrap === !1 && (d = Math.max(h.startAngleRad, Math.min(h.endAngleRad, d))); var d = d * 180 / Math.PI, j = d / (180 /
                Math.PI), l = h.startAngleRad, d = Math.min(j, l), j = Math.max(j, l); j - d > 2 * Math.PI && (j = d + 2 * Math.PI); i = { x: e[0], y: e[1], r: i, innerR: o, start: d, end: j }; g ? (o = i.d, g.attr({ fill: f.color }).animate(i, { step: function (b, c) { g.attr("fill", n.tweenColors(a.Color(k), a.Color(p), c.pos)) } }), i.d = o) : f.graphic = m.arc(i).attr({ stroke: c.borderColor || "none", "stroke-width": c.borderWidth || 0, fill: f.color, "sweep-flag": 0 }).add(b.group)
            })
        }, animate: null
    })
})(Highcharts);
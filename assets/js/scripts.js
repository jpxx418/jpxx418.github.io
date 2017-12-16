! function t(e, r, i) {
    function n(a, s) {
        if (!r[a]) {
            if (!e[a]) {
                var h = "function" == typeof require && require;
                if (!s && h) return h(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = r[a] = {
                exports: {}
            };
            e[a][0].call(c.exports, function(t) {
                var r = e[a][1][t];
                return n(r ? r : t)
            }, c, c.exports, t, e, r, i)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
    return n
}({
    1: [function(t, e, r) {
        "use strict";
        var i = t("lib/zepto/zepto"),
            n = (t("lib/zepto/Ease"), t("lib/anonymous/events/Event"), t("lib/anonymous/utils/RequestAnimationFrame"), t("lib/anonymous/core/Stage"), t("particles/Config"), t("menu/Menu")),
            o = t("fx/Lines"),
            a = t("particles/Particles"),
            s = t("lib/anonymous/display/Scrollable"),
            h = function() {
                i(window).on("resize", this._onResize.bind(this)), this.init()
            };
        h.prototype = {
            init: function() {
                this._displayCredits(), this._content = i(".background"), this._particles = new a(this._content[0]), this._lines = new o, this._menu = new n, this._menu.$.on("change", this._onChangeEntry.bind(this)), this._menu.init(), this._scrollable = new s(document.getElementById("scrollable")), this._scrollable.resize()
            },
            update: function() {
                this._particles.update(), this._scrollable.update()
            },
            _onResize: function() {
                this._particles.resize(), this._scrollable.resize()
            },
            _displayCredits: function() {
                // i.browser.webkit && (console.log("%cʕʘᴥʘʔ︎", "color: #A89E8F; font-size: 54px; font-family: courier new; line-height: 50px;"), console.log("%cI'm watching you.", "color: #A89E8F; font-size: 17px"), console.log(""))
            },
            _onChangeEntry: function(t, e) {
                this._particles.setTexture(e)
            }
        }, i(document).ready(function() {
            var t = new h;
            ! function e() {
                t.update(), window.requestAnimationFrame(e)
            }()
        })
    }, {
        "fx/Lines": 2,
        "lib/anonymous/core/Stage": 3,
        "lib/anonymous/display/Scrollable": 4,
        "lib/anonymous/events/Event": 5,
        "lib/anonymous/utils/RequestAnimationFrame": 9,
        "lib/zepto/Ease": 11,
        "lib/zepto/zepto": 12,
        "menu/Menu": 13,
        "particles/Config": 14,
        "particles/Particles": 16
    }],
    2: [function(t, e, r) {
        "use strict";
        var i = e.exports = function() {
            this.init()
        };
        i.prototype = {
            init: function() {
                this._$lines = $(".line"), this._lines = [];
                for (var t = 0, e = this._$lines.length; t < e; ++t) {
                    var r = this._$lines[t];
                    r.innerHTML = '<span class="line__value">' + r.innerHTML + '</span><span class="line__bg"></span>', $(r).children(".line__bg").animate({
                        translate3d: "-100%,0,0"
                    }, 0), this._lines[t] = $(r)
                }
            },
            show: function() {
                for (var t = 0, e = this._lines.length; t < e; ++t) {
                    var r = this._lines[t];
                    setTimeout($.proxy(function(t) {
                        this._showLine(t)
                    }, this, r), 120 * t)
                }
            },
            destroy: function() {},
            resize: function() {},
            _showLine: function(t) {
                t.css("visibility", "visible");
                var e = $(t),
                    r = e.children(".line__bg"),
                    i = e.children(".line__value");
                r.animate({
                    translate3d: "0,0,0"
                }, 300, Easing.inQuart, function() {
                    i[0].style.visibility = "visible", $(this).animate({
                        translate3d: "101%,0,0"
                    }, 500, Easing.outExpo)
                })
            }
        }
    }, {}],
    3: [function(t, e, r) {
        var i = window.Stage = e.exports = function() {};
        i.$window = $(window), i.$document = $(document), i.$body = $("body"), i.resize = function() {
            i.width = i.$window.width(), i.height = i.$window.height()
        }
    }, {}],
    4: [function(t, e, r) {
        "use strict";
        var i = t("lib/anonymous/core/Stage"),
            n = t("lib/anonymous/events/MouseEvent"),
            o = t("lib/anonymous/utils/Css"),
            a = t("lib/anonymous/utils/DisplayUtils"),
            s = e.exports = function(t) {
                this.dom = t, this.id = Math.random(), this.init()
            };
        s.prototype = {
            init: function() {
                this.vy = 0, this.y = this._y = this._oy = window.scrollY || window.pageYOffset, this._easing = .75, this._friction = .2, this.scrollLocked = !1, this._firstScroll = !0, this._scrollify()
            },
            resize: function() {
                this.height = a.offset(this.dom).height, this._dummy && (this._dummy.style.height = this.height + "px")
            },
            update: function(t) {
                if (!this.scrollLocked && void 0 != this._y) {
                    if (n.touch)
                        if (this._dragging) {
                            this.y += (this._y - this.y) * (t ? 1 : this._easing);
                            var e = .63;
                            this.y > 0 ? this.y -= this.y * e : this.y < -(this.height - i.height) && (this.y += (-(this.height - i.height) - this.y) * e), this.vy = this.y - this._oy
                        } else this.y += this.vy *= this._friction, this.y > 0 ? (this.vy *= this._friction, this.y += .2 * -this.y) : this.y < -(this.height - i.height) && (this.vy *= this._friction, this.y += .2 * (-(this.height - i.height) - this.y));
                    else this.vy -= (this._y + this.y) * (t ? 1 : this._easing), this.y += this.vy *= this._friction;
                    this.y = parseFloat(this.y.toFixed(4)), (this._oy !== this.y || t) && this._updateDom(), this._oy = this.y
                }
            },
            destroy: function() {
                this._dummy && this._dummy.parentNode.removeChild(this._dummy), n.touch ? i.$window.off("touchstart." + this.id).off("touchend." + this.id).off("touchmove." + this.id) : i.$document.off("DOMMouseScroll." + this.id + " mousewheel." + this.id + " scroll." + this.id)
            },
            enabled: function(t) {
                this.scrollLocked = !t, !t && this._dummy ? this._dummy.style.display = "none" : this._dummy && (this._dummy.style.display = "block")
            },
            _updateDom: function() {
                o.transform(this.dom, "translate3d(0," + (n.touch ? 0 | this.y : this.y) + "px,0)")
            },
            _scrollify: function() {
                this.dom.style.position = "fixed", this.dom.style["z-index"] = 1, this.dom.classList.add("scrollable"), this.dom.willChange = "transform", n.touch ? i.$window.on("touchstart." + this.id, this._onTouchDown.bind(this)).on("touchend." + this.id, this._onTouchUp.bind(this)).on("touchmove." + this.id, this._onTouchMove.bind(this)) : (this._dummy = document.createElement("div"), this._dummy.style.position = "absolute", this._dummy.style.top = 0, this._dummy.style.width = "100%", this._dummy.style["z-index"] = 0, this.dom.parentNode.appendChild(this._dummy), i.$document.on("DOMMouseScroll." + this.id + " mousewheel." + this.id, this._onMouseScroll.bind(this)).on("scroll." + this.id, this._onScroll.bind(this)))
            },
            _onMouseScroll: function(t) {
                this._onScroll(t)
            },
            _onScroll: function(t) {
                this.scrollLocked || (this._y = window.scrollY || window.pageYOffset, this._firstScroll && (this.y = this._oy = -this._y, this._firstScroll = !1, this.update(!0)))
            },
            _onTouchDown: function(t) {
                if (!this.scrollLocked) {
                    var e = t.changedTouches[0] || t.touches[0];
                    this._touchInitY = e.pageY, this._initY = this._y = this.y, this._dragging = !0, this._easing = .9, this._friction = .9
                }
            },
            _onTouchMove: function(t) {
                this.scrollLocked || (t.preventDefault(), t = t.changedTouches || t.touches, this._y = t[0].pageY - this._touchInitY + this._initY)
            },
            _onTouchUp: function(t) {
                this.scrollLocked || (this._dragging = !1, this._friction = .96)
            }
        }
    }, {
        "lib/anonymous/core/Stage": 3,
        "lib/anonymous/events/MouseEvent": 6,
        "lib/anonymous/utils/Css": 7,
        "lib/anonymous/utils/DisplayUtils": 8
    }],
    5: [function(t, e, r) {
        var i = e.exports = function() {};
        i.READY = "ready", i.COMPLETE = "complete", i.SHOWN = "shown", i.HIDDEN = "hidden"
    }, {}],
    6: [function(t, e, r) {
        var i = e.exports = function() {};
        i.touch = $.os.tablet || $.os.phone, i.DOWN = i.touch ? "touchstart" : "mousedown", i.UP = i.touch ? "touchend" : "mouseup", i.CLICK = (i.touch, "click"), i.MOVE = i.touch ? "touchmove" : "mousemove", i.ENTER = "mouseenter", i.LEAVE = "mouseleave", i.OVER = "mouseover", i.OUT = "mouseout", i.WHEEL = "mousewheel DOMMouseScroll MozMousePixelScroll", i.SCROLL = "scroll"
    }, {}],
    7: [function(t, e, r) {
        "use strict";
        var i = e.exports = function() {};
        i.vendors = {
            Webkit: "webkit",
            Moz: "moz",
            O: "o"
        }, i.prefix = "", i.init = function() {
            i.setPrefix()
        }, i.setPrefix = function() {
            var t = document.createElement("div");
            if (void 0 !== t.style.transitionProperty) i.prefix = "";
            else
                for (var e in i.vendors)
                    if (void 0 !== t.style[e + "TransitionProperty"]) return i.prefix = "-" + e.toLowerCase() + "-", !1;
            t = null
        }, i.transform = function(t, e) {
            t && (t.style.transform = e, t.style.webkitTransform = e, t.style.mozTransform = e)
        }, i.transformOrigin = function(t, e) {
            t && (t.style.transformOrigin = e, t.style.webkitTransformOrigin = e, t.style.mozTransformOrigin = e)
        }, i.transition = function(t, e) {
            t && (t.style.transition = e, t.style.webkitTransition = e, t.style.mozTransition = e)
        }, i.getMatrix = function(t) {
            var e = window.getComputedStyle(t, null),
                r = e.getPropertyValue("transform") || e.getPropertyValue("-webkit-transform") || e.getPropertyValue("-moz-transform") || e.getPropertyValue("-ms-transform") || e.getPropertyValue("-o-transform"),
                i = /^\w*\((((\d+)|(\d*\.\d+)),\s*)*((\d+)|(\d*\.\d+))\)/i,
                n = [];
            if (i.test(r)) {
                var o = r.replace(/^\w*\(/, "").replace(")", "");
                n = o.split(/\s*,\s*/)
            }
            return n
        }
    }, {}],
    8: [function(t, e, r) {
        "use strict";
        var i = e.exports = function() {};
        i.offset = function(t) {
            var e = t.getBoundingClientRect(),
                r = document.body;
            return {
                top: e.top + r.scrollTop,
                right: e.left + r.scrollRight,
                bottom: e.left + r.scrollBottom,
                left: e.left + r.scrollLeft,
                width: e.width,
                height: e.height
            }
        }, i.detectContain = function(t, e) {
            return e.top > t.top && e.top < t.bottom && e.bottom > t.top && e.bottom < t.bottom
        }
    }, {}],
    9: [function(t, e, r) {
        "use strict";
        e.exports = function() {
            window.requestAnimationFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                    window.setTimeout(t, 1e3 / 60)
                }
            }()
        }()
    }, {}],
    10: [function(t, e, r) {
        var i = {
            REVISION: "71"
        };
        "object" == typeof e && (e.exports = i), void 0 === Math.sign && (Math.sign = function(t) {
                return t < 0 ? -1 : t > 0 ? 1 : +t
            }), i.log = function() {
                console.log.apply(console, arguments)
            }, i.warn = function() {
                console.warn.apply(console, arguments)
            }, i.error = function() {
                console.error.apply(console, arguments)
            }, i.MOUSE = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            }, i.CullFaceNone = 0, i.CullFaceBack = 1, i.CullFaceFront = 2, i.CullFaceFrontBack = 3, i.FrontFaceDirectionCW = 0, i.FrontFaceDirectionCCW = 1, i.BasicShadowMap = 0, i.PCFShadowMap = 1, i.PCFSoftShadowMap = 2, i.FrontSide = 0, i.BackSide = 1, i.DoubleSide = 2, i.NoShading = 0, i.FlatShading = 1, i.SmoothShading = 2, i.NoColors = 0, i.FaceColors = 1, i.VertexColors = 2, i.NoBlending = 0, i.NormalBlending = 1, i.AdditiveBlending = 2, i.SubtractiveBlending = 3, i.MultiplyBlending = 4, i.CustomBlending = 5, i.AddEquation = 100, i.SubtractEquation = 101, i.ReverseSubtractEquation = 102, i.MinEquation = 103, i.MaxEquation = 104, i.ZeroFactor = 200, i.OneFactor = 201, i.SrcColorFactor = 202, i.OneMinusSrcColorFactor = 203, i.SrcAlphaFactor = 204, i.OneMinusSrcAlphaFactor = 205, i.DstAlphaFactor = 206, i.OneMinusDstAlphaFactor = 207, i.DstColorFactor = 208, i.OneMinusDstColorFactor = 209, i.SrcAlphaSaturateFactor = 210, i.MultiplyOperation = 0, i.MixOperation = 1, i.AddOperation = 2, i.UVMapping = 300, i.CubeReflectionMapping = 301, i.CubeRefractionMapping = 302, i.EquirectangularReflectionMapping = 303, i.EquirectangularRefractionMapping = 304, i.SphericalReflectionMapping = 305, i.RepeatWrapping = 1e3, i.ClampToEdgeWrapping = 1001, i.MirroredRepeatWrapping = 1002, i.NearestFilter = 1003, i.NearestMipMapNearestFilter = 1004, i.NearestMipMapLinearFilter = 1005, i.LinearFilter = 1006, i.LinearMipMapNearestFilter = 1007, i.LinearMipMapLinearFilter = 1008, i.UnsignedByteType = 1009, i.ByteType = 1010, i.ShortType = 1011, i.UnsignedShortType = 1012, i.IntType = 1013, i.UnsignedIntType = 1014, i.FloatType = 1015, i.HalfFloatType = 1025, i.UnsignedShort4444Type = 1016, i.UnsignedShort5551Type = 1017, i.UnsignedShort565Type = 1018, i.AlphaFormat = 1019, i.RGBFormat = 1020, i.RGBAFormat = 1021, i.LuminanceFormat = 1022, i.LuminanceAlphaFormat = 1023, i.RGBEFormat = i.RGBAFormat, i.RGB_S3TC_DXT1_Format = 2001, i.RGBA_S3TC_DXT1_Format = 2002, i.RGBA_S3TC_DXT3_Format = 2003, i.RGBA_S3TC_DXT5_Format = 2004, i.RGB_PVRTC_4BPPV1_Format = 2100, i.RGB_PVRTC_2BPPV1_Format = 2101, i.RGBA_PVRTC_4BPPV1_Format = 2102, i.RGBA_PVRTC_2BPPV1_Format = 2103, i.Projector = function() {
                i.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function(t, e) {
                    i.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e)
                }, this.unprojectVector = function(t, e) {
                    i.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(e)
                }, this.pickingRay = function(t, e) {
                    i.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
                }
            }, i.CanvasRenderer = function() {
                i.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElement("canvas"), this.clear = function() {}, this.render = function() {}, this.setClearColor = function() {}, this.setSize = function() {}
            }, i.Color = function(t) {
                return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(t)
            }, i.Color.prototype = {
                constructor: i.Color,
                r: 1,
                g: 1,
                b: 1,
                set: function(t) {
                    return t instanceof i.Color ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
                },
                setHex: function(t) {
                    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
                },
                setRGB: function(t, e, r) {
                    return this.r = t, this.g = e, this.b = r, this
                },
                setHSL: function(t, e, r) {
                    if (0 === e) this.r = this.g = this.b = r;
                    else {
                        var i = function(t, e, r) {
                                return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - r) : t
                            },
                            n = r <= .5 ? r * (1 + e) : r + e - r * e,
                            o = 2 * r - n;
                        this.r = i(o, n, t + 1 / 3), this.g = i(o, n, t), this.b = i(o, n, t - 1 / 3)
                    }
                    return this
                },
                setStyle: function(t) {
                    if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(t)) {
                        var e = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(t);
                        return this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, this
                    }
                    if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(t)) {
                        var e = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(t);
                        return this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, this
                    }
                    if (/^\#([0-9a-f]{6})$/i.test(t)) {
                        var e = /^\#([0-9a-f]{6})$/i.exec(t);
                        return this.setHex(parseInt(e[1], 16)), this
                    }
                    if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(t)) {
                        var e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t);
                        return this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)), this
                    }
                    if (/^(\w+)$/i.test(t)) return this.setHex(i.ColorKeywords[t]), this
                },
                copy: function(t) {
                    return this.r = t.r, this.g = t.g, this.b = t.b, this
                },
                copyGammaToLinear: function(t, e) {
                    return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
                },
                copyLinearToGamma: function(t, e) {
                    void 0 === e && (e = 2);
                    var r = e > 0 ? 1 / e : 1;
                    return this.r = Math.pow(t.r, r), this.g = Math.pow(t.g, r), this.b = Math.pow(t.b, r), this
                },
                convertGammaToLinear: function() {
                    var t = this.r,
                        e = this.g,
                        r = this.b;
                    return this.r = t * t, this.g = e * e, this.b = r * r, this
                },
                convertLinearToGamma: function() {
                    return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
                },
                getHex: function() {
                    return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
                },
                getHexString: function() {
                    return ("000000" + this.getHex().toString(16)).slice(-6)
                },
                getHSL: function(t) {
                    var e, r, i = t || {
                            h: 0,
                            s: 0,
                            l: 0
                        },
                        n = this.r,
                        o = this.g,
                        a = this.b,
                        s = Math.max(n, o, a),
                        h = Math.min(n, o, a),
                        l = (h + s) / 2;
                    if (h === s) e = 0, r = 0;
                    else {
                        var c = s - h;
                        switch (r = l <= .5 ? c / (s + h) : c / (2 - s - h), s) {
                            case n:
                                e = (o - a) / c + (o < a ? 6 : 0);
                                break;
                            case o:
                                e = (a - n) / c + 2;
                                break;
                            case a:
                                e = (n - o) / c + 4
                        }
                        e /= 6
                    }
                    return i.h = e, i.s = r, i.l = l, i
                },
                getStyle: function() {
                    return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
                },
                offsetHSL: function(t, e, r) {
                    var i = this.getHSL();
                    return i.h += t, i.s += e, i.l += r, this.setHSL(i.h, i.s, i.l), this
                },
                add: function(t) {
                    return this.r += t.r, this.g += t.g, this.b += t.b, this
                },
                addColors: function(t, e) {
                    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
                },
                addScalar: function(t) {
                    return this.r += t, this.g += t, this.b += t, this
                },
                multiply: function(t) {
                    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
                },
                multiplyScalar: function(t) {
                    return this.r *= t, this.g *= t, this.b *= t, this
                },
                lerp: function(t, e) {
                    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
                },
                equals: function(t) {
                    return t.r === this.r && t.g === this.g && t.b === this.b
                },
                fromArray: function(t) {
                    return this.r = t[0], this.g = t[1], this.b = t[2], this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
                },
                clone: function() {
                    return (new i.Color).setRGB(this.r, this.g, this.b)
                }
            }, i.ColorKeywords = {
            }, i.Quaternion = function(t, e, r, i) {
                this._x = t || 0, this._y = e || 0, this._z = r || 0, this._w = void 0 !== i ? i : 1
            }, i.Quaternion.prototype = {
                constructor: i.Quaternion,
                _x: 0,
                _y: 0,
                _z: 0,
                _w: 0,
                get x() {
                    return this._x
                },
                set x(t) {
                    this._x = t, this.onChangeCallback()
                },
                get y() {
                    return this._y
                },
                set y(t) {
                    this._y = t, this.onChangeCallback()
                },
                get z() {
                    return this._z
                },
                set z(t) {
                    this._z = t, this.onChangeCallback()
                },
                get w() {
                    return this._w
                },
                set w(t) {
                    this._w = t, this.onChangeCallback()
                },
                set: function(t, e, r, i) {
                    return this._x = t, this._y = e, this._z = r, this._w = i, this.onChangeCallback(), this
                },
                copy: function(t) {
                    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this
                },
                setFromEuler: function(t, e) {
                    if (t instanceof i.Euler == !1) throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    var r = Math.cos(t._x / 2),
                        n = Math.cos(t._y / 2),
                        o = Math.cos(t._z / 2),
                        a = Math.sin(t._x / 2),
                        s = Math.sin(t._y / 2),
                        h = Math.sin(t._z / 2);
                    return "XYZ" === t.order ? (this._x = a * n * o + r * s * h, this._y = r * s * o - a * n * h, this._z = r * n * h + a * s * o, this._w = r * n * o - a * s * h) : "YXZ" === t.order ? (this._x = a * n * o + r * s * h, this._y = r * s * o - a * n * h, this._z = r * n * h - a * s * o, this._w = r * n * o + a * s * h) : "ZXY" === t.order ? (this._x = a * n * o - r * s * h, this._y = r * s * o + a * n * h, this._z = r * n * h + a * s * o, this._w = r * n * o - a * s * h) : "ZYX" === t.order ? (this._x = a * n * o - r * s * h, this._y = r * s * o + a * n * h, this._z = r * n * h - a * s * o, this._w = r * n * o + a * s * h) : "YZX" === t.order ? (this._x = a * n * o + r * s * h, this._y = r * s * o + a * n * h, this._z = r * n * h - a * s * o, this._w = r * n * o - a * s * h) : "XZY" === t.order && (this._x = a * n * o - r * s * h, this._y = r * s * o - a * n * h, this._z = r * n * h + a * s * o, this._w = r * n * o + a * s * h), e !== !1 && this.onChangeCallback(), this
                },
                setFromAxisAngle: function(t, e) {
                    var r = e / 2,
                        i = Math.sin(r);
                    return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(r), this.onChangeCallback(), this
                },
                setFromRotationMatrix: function(t) {
                    var e, r = t.elements,
                        i = r[0],
                        n = r[4],
                        o = r[8],
                        a = r[1],
                        s = r[5],
                        h = r[9],
                        l = r[2],
                        c = r[6],
                        u = r[10],
                        f = i + s + u;
                    return f > 0 ? (e = .5 / Math.sqrt(f + 1), this._w = .25 / e, this._x = (c - h) * e, this._y = (o - l) * e, this._z = (a - n) * e) : i > s && i > u ? (e = 2 * Math.sqrt(1 + i - s - u), this._w = (c - h) / e, this._x = .25 * e, this._y = (n + a) / e, this._z = (o + l) / e) : s > u ? (e = 2 * Math.sqrt(1 + s - i - u), this._w = (o - l) / e, this._x = (n + a) / e, this._y = .25 * e, this._z = (h + c) / e) : (e = 2 * Math.sqrt(1 + u - i - s), this._w = (a - n) / e, this._x = (o + l) / e, this._y = (h + c) / e, this._z = .25 * e), this.onChangeCallback(), this
                },
                setFromUnitVectors: function() {
                    var t, e, r = 1e-6;
                    return function(n, o) {
                        return void 0 === t && (t = new i.Vector3), e = n.dot(o) + 1, e < r ? (e = 0, Math.abs(n.x) > Math.abs(n.z) ? t.set(-n.y, n.x, 0) : t.set(0, -n.z, n.y)) : t.crossVectors(n, o), this._x = t.x, this._y = t.y, this._z = t.z, this._w = e, this.normalize(), this
                    }
                }(),
                inverse: function() {
                    return this.conjugate().normalize(), this
                },
                conjugate: function() {
                    return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
                },
                dot: function(t) {
                    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
                },
                lengthSq: function() {
                    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
                },
                length: function() {
                    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
                },
                normalize: function() {
                    var t = this.length();
                    return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this
                },
                multiply: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
                },
                multiplyQuaternions: function(t, e) {
                    var r = t._x,
                        i = t._y,
                        n = t._z,
                        o = t._w,
                        a = e._x,
                        s = e._y,
                        h = e._z,
                        l = e._w;
                    return this._x = r * l + o * a + i * h - n * s, this._y = i * l + o * s + n * a - r * h, this._z = n * l + o * h + r * s - i * a, this._w = o * l - r * a - i * s - n * h, this.onChangeCallback(), this
                },
                multiplyVector3: function(t) {
                    return i.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this)
                },
                slerp: function(t, e) {
                    if (0 === e) return this;
                    if (1 === e) return this.copy(t);
                    var r = this._x,
                        i = this._y,
                        n = this._z,
                        o = this._w,
                        a = o * t._w + r * t._x + i * t._y + n * t._z;
                    if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1) return this._w = o, this._x = r, this._y = i, this._z = n, this;
                    var s = Math.acos(a),
                        h = Math.sqrt(1 - a * a);
                    if (Math.abs(h) < .001) return this._w = .5 * (o + this._w), this._x = .5 * (r + this._x), this._y = .5 * (i + this._y), this._z = .5 * (n + this._z), this;
                    var l = Math.sin((1 - e) * s) / h,
                        c = Math.sin(e * s) / h;
                    return this._w = o * l + this._w * c, this._x = r * l + this._x * c, this._y = i * l + this._y * c, this._z = n * l + this._z * c, this.onChangeCallback(), this
                },
                equals: function(t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
                },
                fromArray: function(t, e) {
                    return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this.onChangeCallback(), this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
                },
                onChange: function(t) {
                    return this.onChangeCallback = t, this
                },
                onChangeCallback: function() {},
                clone: function() {
                    return new i.Quaternion(this._x, this._y, this._z, this._w)
                }
            }, i.Quaternion.slerp = function(t, e, r, i) {
                return r.copy(t).slerp(e, i)
            }, i.Vector2 = function(t, e) {
                this.x = t || 0, this.y = e || 0
            }, i.Vector2.prototype = {
                constructor: i.Vector2,
                set: function(t, e) {
                    return this.x = t, this.y = e, this
                },
                setX: function(t) {
                    return this.x = t, this
                },
                setY: function(t) {
                    return this.y = t, this
                },
                setComponent: function(t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                getComponent: function(t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                copy: function(t) {
                    return this.x = t.x, this.y = t.y, this
                },
                add: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this)
                },
                addScalar: function(t) {
                    return this.x += t, this.y += t, this
                },
                addVectors: function(t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this
                },
                sub: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this)
                },
                subScalar: function(t) {
                    return this.x -= t, this.y -= t, this
                },
                subVectors: function(t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this
                },
                multiply: function(t) {
                    return this.x *= t.x, this.y *= t.y, this
                },
                multiplyScalar: function(t) {
                    return this.x *= t, this.y *= t, this
                },
                divide: function(t) {
                    return this.x /= t.x, this.y /= t.y, this
                },
                divideScalar: function(t) {
                    if (0 !== t) {
                        var e = 1 / t;
                        this.x *= e, this.y *= e
                    } else this.x = 0, this.y = 0;
                    return this
                },
                min: function(t) {
                    return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this
                },
                max: function(t) {
                    return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this
                },
                clamp: function(t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this
                },
                clampScalar: function() {
                    var t, e;
                    return function(r, n) {
                        return void 0 === t && (t = new i.Vector2, e = new i.Vector2), t.set(r, r), e.set(n, n), this.clamp(t, e)
                    }
                }(),
                floor: function() {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
                },
                ceil: function() {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
                },
                round: function() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                },
                roundToZero: function() {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
                },
                negate: function() {
                    return this.x = -this.x, this.y = -this.y, this
                },
                dot: function(t) {
                    return this.x * t.x + this.y * t.y
                },
                lengthSq: function() {
                    return this.x * this.x + this.y * this.y
                },
                length: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                normalize: function() {
                    return this.divideScalar(this.length())
                },
                distanceTo: function(t) {
                    return Math.sqrt(this.distanceToSquared(t))
                },
                distanceToSquared: function(t) {
                    var e = this.x - t.x,
                        r = this.y - t.y;
                    return e * e + r * r
                },
                setLength: function(t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScalar(t / e), this
                },
                lerp: function(t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
                },
                lerpVectors: function(t, e, r) {
                    return this.subVectors(e, t).multiplyScalar(r).add(t), this
                },
                equals: function(t) {
                    return t.x === this.x && t.y === this.y
                },
                fromArray: function(t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t
                },
                fromAttribute: function(t, e, r) {
                    return void 0 === r && (r = 0), e = e * t.itemSize + r, this.x = t.array[e], this.y = t.array[e + 1], this
                },
                clone: function() {
                    return new i.Vector2(this.x, this.y)
                }
            }, i.Vector3 = function(t, e, r) {
                this.x = t || 0, this.y = e || 0, this.z = r || 0
            }, i.Vector3.prototype = {
                constructor: i.Vector3,
                set: function(t, e, r) {
                    return this.x = t, this.y = e, this.z = r, this
                },
                setX: function(t) {
                    return this.x = t, this
                },
                setY: function(t) {
                    return this.y = t, this
                },
                setZ: function(t) {
                    return this.z = t, this
                },
                setComponent: function(t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        case 2:
                            this.z = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                getComponent: function(t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                copy: function(t) {
                    return this.x = t.x, this.y = t.y, this.z = t.z, this
                },
                add: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this)
                },
                addScalar: function(t) {
                    return this.x += t, this.y += t, this.z += t, this
                },
                addVectors: function(t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
                },
                sub: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
                },
                subScalar: function(t) {
                    return this.x -= t, this.y -= t, this.z -= t, this
                },
                subVectors: function(t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
                },
                multiply: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
                },
                multiplyScalar: function(t) {
                    return this.x *= t, this.y *= t, this.z *= t, this
                },
                multiplyVectors: function(t, e) {
                    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
                },
                applyEuler: function() {
                    var t;
                    return function(e) {
                        return e instanceof i.Euler == !1 && i.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === t && (t = new i.Quaternion), this.applyQuaternion(t.setFromEuler(e)), this
                    }
                }(),
                applyAxisAngle: function() {
                    var t;
                    return function(e, r) {
                        return void 0 === t && (t = new i.Quaternion), this.applyQuaternion(t.setFromAxisAngle(e, r)), this
                    }
                }(),
                applyMatrix3: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = t.elements;
                    return this.x = n[0] * e + n[3] * r + n[6] * i, this.y = n[1] * e + n[4] * r + n[7] * i, this.z = n[2] * e + n[5] * r + n[8] * i, this
                },
                applyMatrix4: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = t.elements;
                    return this.x = n[0] * e + n[4] * r + n[8] * i + n[12], this.y = n[1] * e + n[5] * r + n[9] * i + n[13], this.z = n[2] * e + n[6] * r + n[10] * i + n[14], this
                },
                applyProjection: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = t.elements,
                        o = 1 / (n[3] * e + n[7] * r + n[11] * i + n[15]);
                    return this.x = (n[0] * e + n[4] * r + n[8] * i + n[12]) * o, this.y = (n[1] * e + n[5] * r + n[9] * i + n[13]) * o, this.z = (n[2] * e + n[6] * r + n[10] * i + n[14]) * o, this
                },
                applyQuaternion: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = t.x,
                        o = t.y,
                        a = t.z,
                        s = t.w,
                        h = s * e + o * i - a * r,
                        l = s * r + a * e - n * i,
                        c = s * i + n * r - o * e,
                        u = -n * e - o * r - a * i;
                    return this.x = h * s + u * -n + l * -a - c * -o, this.y = l * s + u * -o + c * -n - h * -a, this.z = c * s + u * -a + h * -o - l * -n, this
                },
                project: function() {
                    var t;
                    return function(e) {
                        return void 0 === t && (t = new i.Matrix4), t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)), this.applyProjection(t)
                    }
                }(),
                unproject: function() {
                    var t;
                    return function(e) {
                        return void 0 === t && (t = new i.Matrix4), t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)), this.applyProjection(t)
                    }
                }(),
                transformDirection: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = t.elements;
                    return this.x = n[0] * e + n[4] * r + n[8] * i, this.y = n[1] * e + n[5] * r + n[9] * i, this.z = n[2] * e + n[6] * r + n[10] * i, this.normalize(), this
                },
                divide: function(t) {
                    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
                },
                divideScalar: function(t) {
                    if (0 !== t) {
                        var e = 1 / t;
                        this.x *= e, this.y *= e, this.z *= e
                    } else this.x = 0, this.y = 0, this.z = 0;
                    return this
                },
                min: function(t) {
                    return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this.z > t.z && (this.z = t.z), this
                },
                max: function(t) {
                    return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this.z < t.z && (this.z = t.z), this
                },
                clamp: function(t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z), this
                },
                clampScalar: function() {
                    var t, e;
                    return function(r, n) {
                        return void 0 === t && (t = new i.Vector3, e = new i.Vector3), t.set(r, r, r), e.set(n, n, n), this.clamp(t, e)
                    }
                }(),
                floor: function() {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
                },
                ceil: function() {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
                },
                round: function() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
                },
                roundToZero: function() {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
                },
                negate: function() {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
                },
                dot: function(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z
                },
                lengthSq: function() {
                    return this.x * this.x + this.y * this.y + this.z * this.z
                },
                length: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
                },
                lengthManhattan: function() {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
                },
                normalize: function() {
                    return this.divideScalar(this.length())
                },
                setLength: function(t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScalar(t / e), this
                },
                lerp: function(t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
                },
                lerpVectors: function(t, e, r) {
                    return this.subVectors(e, t).multiplyScalar(r).add(t), this
                },
                cross: function(t, e) {
                    if (void 0 !== e) return i.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e);
                    var r = this.x,
                        n = this.y,
                        o = this.z;
                    return this.x = n * t.z - o * t.y, this.y = o * t.x - r * t.z, this.z = r * t.y - n * t.x, this
                },
                crossVectors: function(t, e) {
                    var r = t.x,
                        i = t.y,
                        n = t.z,
                        o = e.x,
                        a = e.y,
                        s = e.z;
                    return this.x = i * s - n * a, this.y = n * o - r * s, this.z = r * a - i * o, this
                },
                projectOnVector: function() {
                    var t, e;
                    return function(r) {
                        return void 0 === t && (t = new i.Vector3),
                            t.copy(r).normalize(), e = this.dot(t), this.copy(t).multiplyScalar(e)
                    }
                }(),
                projectOnPlane: function() {
                    var t;
                    return function(e) {
                        return void 0 === t && (t = new i.Vector3), t.copy(this).projectOnVector(e), this.sub(t)
                    }
                }(),
                reflect: function() {
                    var t;
                    return function(e) {
                        return void 0 === t && (t = new i.Vector3), this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)))
                    }
                }(),
                angleTo: function(t) {
                    var e = this.dot(t) / (this.length() * t.length());
                    return Math.acos(i.Math.clamp(e, -1, 1))
                },
                distanceTo: function(t) {
                    return Math.sqrt(this.distanceToSquared(t))
                },
                distanceToSquared: function(t) {
                    var e = this.x - t.x,
                        r = this.y - t.y,
                        i = this.z - t.z;
                    return e * e + r * r + i * i
                },
                setEulerFromRotationMatrix: function(t, e) {
                    i.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
                },
                setEulerFromQuaternion: function(t, e) {
                    i.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
                },
                getPositionFromMatrix: function(t) {
                    return i.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t)
                },
                getScaleFromMatrix: function(t) {
                    return i.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t)
                },
                getColumnFromMatrix: function(t, e) {
                    return i.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(t, e)
                },
                setFromMatrixPosition: function(t) {
                    return this.x = t.elements[12], this.y = t.elements[13], this.z = t.elements[14], this
                },
                setFromMatrixScale: function(t) {
                    var e = this.set(t.elements[0], t.elements[1], t.elements[2]).length(),
                        r = this.set(t.elements[4], t.elements[5], t.elements[6]).length(),
                        i = this.set(t.elements[8], t.elements[9], t.elements[10]).length();
                    return this.x = e, this.y = r, this.z = i, this
                },
                setFromMatrixColumn: function(t, e) {
                    var r = 4 * t,
                        i = e.elements;
                    return this.x = i[r], this.y = i[r + 1], this.z = i[r + 2], this
                },
                equals: function(t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z
                },
                fromArray: function(t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
                },
                fromAttribute: function(t, e, r) {
                    return void 0 === r && (r = 0), e = e * t.itemSize + r, this.x = t.array[e], this.y = t.array[e + 1], this.z = t.array[e + 2], this
                },
                clone: function() {
                    return new i.Vector3(this.x, this.y, this.z)
                }
            }, i.Vector4 = function(t, e, r, i) {
                this.x = t || 0, this.y = e || 0, this.z = r || 0, this.w = void 0 !== i ? i : 1
            }, i.Vector4.prototype = {
                constructor: i.Vector4,
                set: function(t, e, r, i) {
                    return this.x = t, this.y = e, this.z = r, this.w = i, this
                },
                setX: function(t) {
                    return this.x = t, this
                },
                setY: function(t) {
                    return this.y = t, this
                },
                setZ: function(t) {
                    return this.z = t, this
                },
                setW: function(t) {
                    return this.w = t, this
                },
                setComponent: function(t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        case 2:
                            this.z = e;
                            break;
                        case 3:
                            this.w = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                getComponent: function(t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        case 3:
                            return this.w;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                },
                copy: function(t) {
                    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
                },
                add: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
                },
                addScalar: function(t) {
                    return this.x += t, this.y += t, this.z += t, this.w += t, this
                },
                addVectors: function(t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
                },
                sub: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
                },
                subScalar: function(t) {
                    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
                },
                subVectors: function(t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
                },
                multiplyScalar: function(t) {
                    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
                },
                applyMatrix4: function(t) {
                    var e = this.x,
                        r = this.y,
                        i = this.z,
                        n = this.w,
                        o = t.elements;
                    return this.x = o[0] * e + o[4] * r + o[8] * i + o[12] * n, this.y = o[1] * e + o[5] * r + o[9] * i + o[13] * n, this.z = o[2] * e + o[6] * r + o[10] * i + o[14] * n, this.w = o[3] * e + o[7] * r + o[11] * i + o[15] * n, this
                },
                divideScalar: function(t) {
                    if (0 !== t) {
                        var e = 1 / t;
                        this.x *= e, this.y *= e, this.z *= e, this.w *= e
                    } else this.x = 0, this.y = 0, this.z = 0, this.w = 1;
                    return this
                },
                setAxisAngleFromQuaternion: function(t) {
                    this.w = 2 * Math.acos(t.w);
                    var e = Math.sqrt(1 - t.w * t.w);
                    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
                },
                setAxisAngleFromRotationMatrix: function(t) {
                    var e, r, i, n, o = .01,
                        a = .1,
                        s = t.elements,
                        h = s[0],
                        l = s[4],
                        c = s[8],
                        u = s[1],
                        f = s[5],
                        p = s[9],
                        d = s[2],
                        m = s[6],
                        g = s[10];
                    if (Math.abs(l - u) < o && Math.abs(c - d) < o && Math.abs(p - m) < o) {
                        if (Math.abs(l + u) < a && Math.abs(c + d) < a && Math.abs(p + m) < a && Math.abs(h + f + g - 3) < a) return this.set(1, 0, 0, 0), this;
                        e = Math.PI;
                        var v = (h + 1) / 2,
                            y = (f + 1) / 2,
                            x = (g + 1) / 2,
                            b = (l + u) / 4,
                            _ = (c + d) / 4,
                            w = (p + m) / 4;
                        return v > y && v > x ? v < o ? (r = 0, i = .707106781, n = .707106781) : (r = Math.sqrt(v), i = b / r, n = _ / r) : y > x ? y < o ? (r = .707106781, i = 0, n = .707106781) : (i = Math.sqrt(y), r = b / i, n = w / i) : x < o ? (r = .707106781, i = .707106781, n = 0) : (n = Math.sqrt(x), r = _ / n, i = w / n), this.set(r, i, n, e), this
                    }
                    var M = Math.sqrt((m - p) * (m - p) + (c - d) * (c - d) + (u - l) * (u - l));
                    return Math.abs(M) < .001 && (M = 1), this.x = (m - p) / M, this.y = (c - d) / M, this.z = (u - l) / M, this.w = Math.acos((h + f + g - 1) / 2), this
                },
                min: function(t) {
                    return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this.z > t.z && (this.z = t.z), this.w > t.w && (this.w = t.w), this
                },
                max: function(t) {
                    return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this.z < t.z && (this.z = t.z), this.w < t.w && (this.w = t.w), this
                },
                clamp: function(t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z), this.w < t.w ? this.w = t.w : this.w > e.w && (this.w = e.w), this
                },
                clampScalar: function() {
                    var t, e;
                    return function(r, n) {
                        return void 0 === t && (t = new i.Vector4, e = new i.Vector4), t.set(r, r, r, r), e.set(n, n, n, n), this.clamp(t, e)
                    }
                }(),
                floor: function() {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
                },
                ceil: function() {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
                },
                round: function() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
                },
                roundToZero: function() {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
                },
                negate: function() {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
                },
                dot: function(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
                },
                lengthSq: function() {
                    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
                },
                length: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
                },
                lengthManhattan: function() {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
                },
                normalize: function() {
                    return this.divideScalar(this.length())
                },
                setLength: function(t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScalar(t / e), this
                },
                lerp: function(t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
                },
                lerpVectors: function(t, e, r) {
                    return this.subVectors(e, t).multiplyScalar(r).add(t), this
                },
                equals: function(t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
                },
                fromArray: function(t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
                },
                fromAttribute: function(t, e, r) {
                    return void 0 === r && (r = 0), e = e * t.itemSize + r, this.x = t.array[e], this.y = t.array[e + 1], this.z = t.array[e + 2], this.w = t.array[e + 3], this
                },
                clone: function() {
                    return new i.Vector4(this.x, this.y, this.z, this.w)
                }
            }, i.Euler = function(t, e, r, n) {
                this._x = t || 0, this._y = e || 0, this._z = r || 0, this._order = n || i.Euler.DefaultOrder
            }, i.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], i.Euler.DefaultOrder = "XYZ", i.Euler.prototype = {
                constructor: i.Euler,
                _x: 0,
                _y: 0,
                _z: 0,
                _order: i.Euler.DefaultOrder,
                get x() {
                    return this._x
                },
                set x(t) {
                    this._x = t, this.onChangeCallback()
                },
                get y() {
                    return this._y
                },
                set y(t) {
                    this._y = t, this.onChangeCallback()
                },
                get z() {
                    return this._z
                },
                set z(t) {
                    this._z = t, this.onChangeCallback()
                },
                get order() {
                    return this._order
                },
                set order(t) {
                    this._order = t, this.onChangeCallback()
                },
                set: function(t, e, r, i) {
                    return this._x = t, this._y = e, this._z = r, this._order = i || this._order, this.onChangeCallback(), this
                },
                copy: function(t) {
                    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this
                },
                setFromRotationMatrix: function(t, e, r) {
                    var n = i.Math.clamp,
                        o = t.elements,
                        a = o[0],
                        s = o[4],
                        h = o[8],
                        l = o[1],
                        c = o[5],
                        u = o[9],
                        f = o[2],
                        p = o[6],
                        d = o[10];
                    return e = e || this._order, "XYZ" === e ? (this._y = Math.asin(n(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-u, d), this._z = Math.atan2(-s, a)) : (this._x = Math.atan2(p, c), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-n(u, -1, 1)), Math.abs(u) < .99999 ? (this._y = Math.atan2(h, d), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, a), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(n(p, -1, 1)), Math.abs(p) < .99999 ? (this._y = Math.atan2(-f, d), this._z = Math.atan2(-s, c)) : (this._y = 0, this._z = Math.atan2(l, a))) : "ZYX" === e ? (this._y = Math.asin(-n(f, -1, 1)), Math.abs(f) < .99999 ? (this._x = Math.atan2(p, d), this._z = Math.atan2(l, a)) : (this._x = 0, this._z = Math.atan2(-s, c))) : "YZX" === e ? (this._z = Math.asin(n(l, -1, 1)), Math.abs(l) < .99999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-f, a)) : (this._x = 0, this._y = Math.atan2(h, d))) : "XZY" === e ? (this._z = Math.asin(-n(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(p, c), this._y = Math.atan2(h, a)) : (this._x = Math.atan2(-u, d), this._y = 0)) : i.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), this._order = e, r !== !1 && this.onChangeCallback(), this
                },
                setFromQuaternion: function() {
                    var t;
                    return function(e, r, n) {
                        return void 0 === t && (t = new i.Matrix4), t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, r, n), this
                    }
                }(),
                setFromVector3: function(t, e) {
                    return this.set(t.x, t.y, t.z, e || this._order)
                },
                reorder: function() {
                    var t = new i.Quaternion;
                    return function(e) {
                        t.setFromEuler(this), this.setFromQuaternion(t, e)
                    }
                }(),
                equals: function(t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
                },
                fromArray: function(t) {
                    return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this
                },
                toArray: function(t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
                },
                toVector3: function(t) {
                    return t ? t.set(this._x, this._y, this._z) : new i.Vector3(this._x, this._y, this._z)
                },
                onChange: function(t) {
                    return this.onChangeCallback = t, this
                },
                onChangeCallback: function() {},
                clone: function() {
                    return new i.Euler(this._x, this._y, this._z, this._order)
                }
            }, i.Line3 = function(t, e) {
                this.start = void 0 !== t ? t : new i.Vector3, this.end = void 0 !== e ? e : new i.Vector3
            }, i.Line3.prototype = {
                constructor: i.Line3,
                set: function(t, e) {
                    return this.start.copy(t), this.end.copy(e), this
                },
                copy: function(t) {
                    return this.start.copy(t.start), this.end.copy(t.end), this
                },
                center: function(t) {
                    var e = t || new i.Vector3;
                    return e.addVectors(this.start, this.end).multiplyScalar(.5)
                },
                delta: function(t) {
                    var e = t || new i.Vector3;
                    return e.subVectors(this.end, this.start)
                },
                distanceSq: function() {
                    return this.start.distanceToSquared(this.end)
                },
                distance: function() {
                    return this.start.distanceTo(this.end)
                },
                at: function(t, e) {
                    var r = e || new i.Vector3;
                    return this.delta(r).multiplyScalar(t).add(this.start)
                },
                closestPointToPointParameter: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3;
                    return function(r, n) {
                        t.subVectors(r, this.start), e.subVectors(this.end, this.start);
                        var o = e.dot(e),
                            a = e.dot(t),
                            s = a / o;
                        return n && (s = i.Math.clamp(s, 0, 1)), s
                    }
                }(),
                closestPointToPoint: function(t, e, r) {
                    var n = this.closestPointToPointParameter(t, e),
                        o = r || new i.Vector3;
                    return this.delta(o).multiplyScalar(n).add(this.start)
                },
                applyMatrix4: function(t) {
                    return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this
                },
                equals: function(t) {
                    return t.start.equals(this.start) && t.end.equals(this.end)
                },
                clone: function() {
                    return (new i.Line3).copy(this)
                }
            }, i.Box2 = function(t, e) {
                this.min = void 0 !== t ? t : new i.Vector2(1 / 0, 1 / 0), this.max = void 0 !== e ? e : new i.Vector2((-(1 / 0)), (-(1 / 0)))
            }, i.Box2.prototype = {
                constructor: i.Box2,
                set: function(t, e) {
                    return this.min.copy(t), this.max.copy(e), this
                },
                setFromPoints: function(t) {
                    this.makeEmpty();
                    for (var e = 0, r = t.length; e < r; e++) this.expandByPoint(t[e]);
                    return this
                },
                setFromCenterAndSize: function() {
                    var t = new i.Vector2;
                    return function(e, r) {
                        var i = t.copy(r).multiplyScalar(.5);
                        return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
                    }
                }(),
                copy: function(t) {
                    return this.min.copy(t.min), this.max.copy(t.max), this
                },
                makeEmpty: function() {
                    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
                },
                empty: function() {
                    return this.max.x < this.min.x || this.max.y < this.min.y
                },
                center: function(t) {
                    var e = t || new i.Vector2;
                    return e.addVectors(this.min, this.max).multiplyScalar(.5)
                },
                size: function(t) {
                    var e = t || new i.Vector2;
                    return e.subVectors(this.max, this.min)
                },
                expandByPoint: function(t) {
                    return this.min.min(t), this.max.max(t), this
                },
                expandByVector: function(t) {
                    return this.min.sub(t), this.max.add(t), this
                },
                expandByScalar: function(t) {
                    return this.min.addScalar(-t), this.max.addScalar(t), this
                },
                containsPoint: function(t) {
                    return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
                },
                containsBox: function(t) {
                    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y
                },
                getParameter: function(t, e) {
                    var r = e || new i.Vector2;
                    return r.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
                },
                isIntersectionBox: function(t) {
                    return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y)
                },
                clampPoint: function(t, e) {
                    var r = e || new i.Vector2;
                    return r.copy(t).clamp(this.min, this.max)
                },
                distanceToPoint: function() {
                    var t = new i.Vector2;
                    return function(e) {
                        var r = t.copy(e).clamp(this.min, this.max);
                        return r.sub(e).length()
                    }
                }(),
                intersect: function(t) {
                    return this.min.max(t.min), this.max.min(t.max), this
                },
                union: function(t) {
                    return this.min.min(t.min), this.max.max(t.max), this
                },
                translate: function(t) {
                    return this.min.add(t), this.max.add(t), this
                },
                equals: function(t) {
                    return t.min.equals(this.min) && t.max.equals(this.max)
                },
                clone: function() {
                    return (new i.Box2).copy(this)
                }
            }, i.Box3 = function(t, e) {
                this.min = void 0 !== t ? t : new i.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== e ? e : new i.Vector3((-(1 / 0)), (-(1 / 0)), (-(1 / 0)))
            }, i.Box3.prototype = {
                constructor: i.Box3,
                set: function(t, e) {
                    return this.min.copy(t), this.max.copy(e), this
                },
                setFromPoints: function(t) {
                    this.makeEmpty();
                    for (var e = 0, r = t.length; e < r; e++) this.expandByPoint(t[e]);
                    return this
                },
                setFromCenterAndSize: function() {
                    var t = new i.Vector3;
                    return function(e, r) {
                        var i = t.copy(r).multiplyScalar(.5);
                        return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
                    }
                }(),
                setFromObject: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        var r = this;
                        return e.updateMatrixWorld(!0), this.makeEmpty(), e.traverse(function(e) {
                            var n = e.geometry;
                            if (void 0 !== n)
                                if (n instanceof i.Geometry)
                                    for (var o = n.vertices, a = 0, s = o.length; a < s; a++) t.copy(o[a]), t.applyMatrix4(e.matrixWorld), r.expandByPoint(t);
                                else if (n instanceof i.BufferGeometry && void 0 !== n.attributes.position)
                                for (var h = n.attributes.position.array, a = 0, s = h.length; a < s; a += 3) t.set(h[a], h[a + 1], h[a + 2]), t.applyMatrix4(e.matrixWorld), r.expandByPoint(t)
                        }), this
                    }
                }(),
                copy: function(t) {
                    return this.min.copy(t.min), this.max.copy(t.max), this
                },
                makeEmpty: function() {
                    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
                },
                empty: function() {
                    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
                },
                center: function(t) {
                    var e = t || new i.Vector3;
                    return e.addVectors(this.min, this.max).multiplyScalar(.5)
                },
                size: function(t) {
                    var e = t || new i.Vector3;
                    return e.subVectors(this.max, this.min)
                },
                expandByPoint: function(t) {
                    return this.min.min(t), this.max.max(t), this
                },
                expandByVector: function(t) {
                    return this.min.sub(t), this.max.add(t), this
                },
                expandByScalar: function(t) {
                    return this.min.addScalar(-t), this.max.addScalar(t), this
                },
                containsPoint: function(t) {
                    return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
                },
                containsBox: function(t) {
                    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
                },
                getParameter: function(t, e) {
                    var r = e || new i.Vector3;
                    return r.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
                },
                isIntersectionBox: function(t) {
                    return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
                },
                clampPoint: function(t, e) {
                    var r = e || new i.Vector3;
                    return r.copy(t).clamp(this.min, this.max)
                },
                distanceToPoint: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        var r = t.copy(e).clamp(this.min, this.max);
                        return r.sub(e).length()
                    }
                }(),
                getBoundingSphere: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        var r = e || new i.Sphere;
                        return r.center = this.center(), r.radius = .5 * this.size(t).length(), r
                    }
                }(),
                intersect: function(t) {
                    return this.min.max(t.min), this.max.min(t.max), this
                },
                union: function(t) {
                    return this.min.min(t.min), this.max.max(t.max), this
                },
                applyMatrix4: function() {
                    var t = [new i.Vector3, new i.Vector3, new i.Vector3, new i.Vector3, new i.Vector3, new i.Vector3, new i.Vector3, new i.Vector3];
                    return function(e) {
                        return t[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), t[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), t[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), t[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), t[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), t[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), t[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), t[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.makeEmpty(), this.setFromPoints(t), this
                    }
                }(),
                translate: function(t) {
                    return this.min.add(t), this.max.add(t), this
                },
                equals: function(t) {
                    return t.min.equals(this.min) && t.max.equals(this.max)
                },
                clone: function() {
                    return (new i.Box3).copy(this)
                }
            }, i.Matrix3 = function() {
                this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && i.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
            }, i.Matrix3.prototype = {
                constructor: i.Matrix3,
                set: function(t, e, r, i, n, o, a, s, h) {
                    var l = this.elements;
                    return l[0] = t, l[3] = e, l[6] = r, l[1] = i, l[4] = n, l[7] = o, l[2] = a, l[5] = s, l[8] = h, this
                },
                identity: function() {
                    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
                },
                copy: function(t) {
                    var e = t.elements;
                    return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
                },
                multiplyVector3: function(t) {
                    return i.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
                },
                multiplyVector3Array: function(t) {
                    return i.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
                },
                applyToVector3Array: function() {
                    var t = new i.Vector3;
                    return function(e, r, i) {
                        void 0 === r && (r = 0), void 0 === i && (i = e.length);
                        for (var n = 0, o = r; n < i; n += 3, o += 3) t.x = e[o], t.y = e[o + 1], t.z = e[o + 2], t.applyMatrix3(this), e[o] = t.x, e[o + 1] = t.y, e[o + 2] = t.z;
                        return e
                    }
                }(),
                multiplyScalar: function(t) {
                    var e = this.elements;
                    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
                },
                determinant: function() {
                    var t = this.elements,
                        e = t[0],
                        r = t[1],
                        i = t[2],
                        n = t[3],
                        o = t[4],
                        a = t[5],
                        s = t[6],
                        h = t[7],
                        l = t[8];
                    return e * o * l - e * a * h - r * n * l + r * a * s + i * n * h - i * o * s
                },
                getInverse: function(t, e) {
                    var r = t.elements,
                        n = this.elements;
                    n[0] = r[10] * r[5] - r[6] * r[9], n[1] = -r[10] * r[1] + r[2] * r[9], n[2] = r[6] * r[1] - r[2] * r[5], n[3] = -r[10] * r[4] + r[6] * r[8], n[4] = r[10] * r[0] - r[2] * r[8], n[5] = -r[6] * r[0] + r[2] * r[4], n[6] = r[9] * r[4] - r[5] * r[8], n[7] = -r[9] * r[0] + r[1] * r[8], n[8] = r[5] * r[0] - r[1] * r[4];
                    var o = r[0] * n[0] + r[1] * n[3] + r[2] * n[6];
                    if (0 === o) {
                        var a = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                        if (e) throw new Error(a);
                        return i.warn(a), this.identity(), this
                    }
                    return this.multiplyScalar(1 / o), this
                },
                transpose: function() {
                    var t, e = this.elements;
                    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
                },
                flattenToArrayOffset: function(t, e) {
                    var r = this.elements;
                    return t[e] = r[0], t[e + 1] = r[1], t[e + 2] = r[2], t[e + 3] = r[3], t[e + 4] = r[4], t[e + 5] = r[5], t[e + 6] = r[6], t[e + 7] = r[7], t[e + 8] = r[8], t
                },
                getNormalMatrix: function(t) {
                    return this.getInverse(t).transpose(), this
                },
                transposeIntoArray: function(t) {
                    var e = this.elements;
                    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
                },
                fromArray: function(t) {
                    return this.elements.set(t), this
                },
                toArray: function() {
                    var t = this.elements;
                    return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]]
                },
                clone: function() {
                    return (new i.Matrix3).fromArray(this.elements)
                }
            }, i.Matrix4 = function() {
                this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && i.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
            }, i.Matrix4.prototype = {
                constructor: i.Matrix4,
                set: function(t, e, r, i, n, o, a, s, h, l, c, u, f, p, d, m) {
                    var g = this.elements;
                    return g[0] = t, g[4] = e, g[8] = r, g[12] = i, g[1] = n, g[5] = o, g[9] = a, g[13] = s, g[2] = h, g[6] = l, g[10] = c, g[14] = u, g[3] = f, g[7] = p, g[11] = d, g[15] = m, this
                },
                identity: function() {
                    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                },
                copy: function(t) {
                    return this.elements.set(t.elements), this
                },
                extractPosition: function(t) {
                    return i.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t)
                },
                copyPosition: function(t) {
                    var e = this.elements,
                        r = t.elements;
                    return e[12] = r[12], e[13] = r[13], e[14] = r[14], this
                },
                extractBasis: function(t, e, r) {
                    var i = this.elements;
                    return t.set(i[0], i[1], i[2]), e.set(i[4], i[5], i[6]), r.set(i[8], i[9], i[10]), this
                },
                makeBasis: function(t, e, r) {
                    return this.set(t.x, e.x, r.x, 0, t.y, e.y, r.y, 0, t.z, e.z, r.z, 0, 0, 0, 0, 1), this
                },
                extractRotation: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        var r = this.elements,
                            i = e.elements,
                            n = 1 / t.set(i[0], i[1], i[2]).length(),
                            o = 1 / t.set(i[4], i[5], i[6]).length(),
                            a = 1 / t.set(i[8], i[9], i[10]).length();
                        return r[0] = i[0] * n, r[1] = i[1] * n, r[2] = i[2] * n, r[4] = i[4] * o, r[5] = i[5] * o, r[6] = i[6] * o, r[8] = i[8] * a, r[9] = i[9] * a, r[10] = i[10] * a, this
                    }
                }(),
                makeRotationFromEuler: function(t) {
                    t instanceof i.Euler == !1 && i.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    var e = this.elements,
                        r = t.x,
                        n = t.y,
                        o = t.z,
                        a = Math.cos(r),
                        s = Math.sin(r),
                        h = Math.cos(n),
                        l = Math.sin(n),
                        c = Math.cos(o),
                        u = Math.sin(o);
                    if ("XYZ" === t.order) {
                        var f = a * c,
                            p = a * u,
                            d = s * c,
                            m = s * u;
                        e[0] = h * c, e[4] = -h * u, e[8] = l, e[1] = p + d * l, e[5] = f - m * l, e[9] = -s * h, e[2] = m - f * l, e[6] = d + p * l, e[10] = a * h
                    } else if ("YXZ" === t.order) {
                        var g = h * c,
                            v = h * u,
                            y = l * c,
                            x = l * u;
                        e[0] = g + x * s, e[4] = y * s - v, e[8] = a * l, e[1] = a * u, e[5] = a * c, e[9] = -s, e[2] = v * s - y, e[6] = x + g * s, e[10] = a * h
                    } else if ("ZXY" === t.order) {
                        var g = h * c,
                            v = h * u,
                            y = l * c,
                            x = l * u;
                        e[0] = g - x * s, e[4] = -a * u, e[8] = y + v * s, e[1] = v + y * s, e[5] = a * c, e[9] = x - g * s, e[2] = -a * l, e[6] = s, e[10] = a * h
                    } else if ("ZYX" === t.order) {
                        var f = a * c,
                            p = a * u,
                            d = s * c,
                            m = s * u;
                        e[0] = h * c, e[4] = d * l - p, e[8] = f * l + m, e[1] = h * u, e[5] = m * l + f, e[9] = p * l - d, e[2] = -l, e[6] = s * h, e[10] = a * h
                    } else if ("YZX" === t.order) {
                        var b = a * h,
                            _ = a * l,
                            w = s * h,
                            M = s * l;
                        e[0] = h * c, e[4] = M - b * u, e[8] = w * u + _, e[1] = u, e[5] = a * c, e[9] = -s * c, e[2] = -l * c, e[6] = _ * u + w, e[10] = b - M * u
                    } else if ("XZY" === t.order) {
                        var b = a * h,
                            _ = a * l,
                            w = s * h,
                            M = s * l;
                        e[0] = h * c, e[4] = -u, e[8] = l * c, e[1] = b * u + M, e[5] = a * c, e[9] = _ * u - w, e[2] = w * u - _, e[6] = s * c, e[10] = M * u + b
                    }
                    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
                },
                setRotationFromQuaternion: function(t) {
                    return i.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t)
                },
                makeRotationFromQuaternion: function(t) {
                    var e = this.elements,
                        r = t.x,
                        i = t.y,
                        n = t.z,
                        o = t.w,
                        a = r + r,
                        s = i + i,
                        h = n + n,
                        l = r * a,
                        c = r * s,
                        u = r * h,
                        f = i * s,
                        p = i * h,
                        d = n * h,
                        m = o * a,
                        g = o * s,
                        v = o * h;
                    return e[0] = 1 - (f + d), e[4] = c - v, e[8] = u + g, e[1] = c + v, e[5] = 1 - (l + d), e[9] = p - m, e[2] = u - g, e[6] = p + m, e[10] = 1 - (l + f), e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
                },
                lookAt: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3,
                        r = new i.Vector3;
                    return function(i, n, o) {
                        var a = this.elements;
                        return r.subVectors(i, n).normalize(), 0 === r.length() && (r.z = 1), t.crossVectors(o, r).normalize(), 0 === t.length() && (r.x += 1e-4, t.crossVectors(o, r).normalize()), e.crossVectors(r, t), a[0] = t.x, a[4] = e.x, a[8] = r.x, a[1] = t.y, a[5] = e.y, a[9] = r.y, a[2] = t.z, a[6] = e.z, a[10] = r.z, this
                    }
                }(),
                multiply: function(t, e) {
                    return void 0 !== e ? (i.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
                },
                multiplyMatrices: function(t, e) {
                    var r = t.elements,
                        i = e.elements,
                        n = this.elements,
                        o = r[0],
                        a = r[4],
                        s = r[8],
                        h = r[12],
                        l = r[1],
                        c = r[5],
                        u = r[9],
                        f = r[13],
                        p = r[2],
                        d = r[6],
                        m = r[10],
                        g = r[14],
                        v = r[3],
                        y = r[7],
                        x = r[11],
                        b = r[15],
                        _ = i[0],
                        w = i[4],
                        M = i[8],
                        S = i[12],
                        T = i[1],
                        E = i[5],
                        C = i[9],
                        A = i[13],
                        L = i[2],
                        P = i[6],
                        R = i[10],
                        F = i[14],
                        D = i[3],
                        B = i[7],
                        U = i[11],
                        V = i[15];
                    return n[0] = o * _ + a * T + s * L + h * D, n[4] = o * w + a * E + s * P + h * B, n[8] = o * M + a * C + s * R + h * U, n[12] = o * S + a * A + s * F + h * V, n[1] = l * _ + c * T + u * L + f * D, n[5] = l * w + c * E + u * P + f * B, n[9] = l * M + c * C + u * R + f * U, n[13] = l * S + c * A + u * F + f * V, n[2] = p * _ + d * T + m * L + g * D, n[6] = p * w + d * E + m * P + g * B, n[10] = p * M + d * C + m * R + g * U, n[14] = p * S + d * A + m * F + g * V, n[3] = v * _ + y * T + x * L + b * D, n[7] = v * w + y * E + x * P + b * B, n[11] = v * M + y * C + x * R + b * U, n[15] = v * S + y * A + x * F + b * V, this
                },
                multiplyToArray: function(t, e, r) {
                    var i = this.elements;
                    return this.multiplyMatrices(t, e), r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = i[4], r[5] = i[5], r[6] = i[6], r[7] = i[7], r[8] = i[8], r[9] = i[9], r[10] = i[10], r[11] = i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], this
                },
                multiplyScalar: function(t) {
                    var e = this.elements;
                    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
                },
                multiplyVector3: function(t) {
                    return i.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), t.applyProjection(this)
                },
                multiplyVector4: function(t) {
                    return i.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
                },
                multiplyVector3Array: function(t) {
                    return i.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
                },
                applyToVector3Array: function() {
                    var t = new i.Vector3;
                    return function(e, r, i) {
                        void 0 === r && (r = 0), void 0 === i && (i = e.length);
                        for (var n = 0, o = r; n < i; n += 3, o += 3) t.x = e[o], t.y = e[o + 1], t.z = e[o + 2], t.applyMatrix4(this), e[o] = t.x, e[o + 1] = t.y, e[o + 2] = t.z;
                        return e
                    }
                }(),
                rotateAxis: function(t) {
                    i.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this)
                },
                crossVector: function(t) {
                    return i.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
                },
                determinant: function() {
                    var t = this.elements,
                        e = t[0],
                        r = t[4],
                        i = t[8],
                        n = t[12],
                        o = t[1],
                        a = t[5],
                        s = t[9],
                        h = t[13],
                        l = t[2],
                        c = t[6],
                        u = t[10],
                        f = t[14],
                        p = t[3],
                        d = t[7],
                        m = t[11],
                        g = t[15];
                    return p * (+n * s * c - i * h * c - n * a * u + r * h * u + i * a * f - r * s * f) + d * (+e * s * f - e * h * u + n * o * u - i * o * f + i * h * l - n * s * l) + m * (+e * h * c - e * a * f - n * o * c + r * o * f + n * a * l - r * h * l) + g * (-i * a * l - e * s * c + e * a * u + i * o * c - r * o * u + r * s * l)
                },
                transpose: function() {
                    var t, e = this.elements;
                    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
                },
                flattenToArrayOffset: function(t, e) {
                    var r = this.elements;
                    return t[e] = r[0], t[e + 1] = r[1], t[e + 2] = r[2], t[e + 3] = r[3], t[e + 4] = r[4], t[e + 5] = r[5], t[e + 6] = r[6], t[e + 7] = r[7], t[e + 8] = r[8], t[e + 9] = r[9], t[e + 10] = r[10], t[e + 11] = r[11], t[e + 12] = r[12], t[e + 13] = r[13], t[e + 14] = r[14], t[e + 15] = r[15], t
                },
                getPosition: function() {
                    var t = new i.Vector3;
                    return function() {
                        i.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                        var e = this.elements;
                        return t.set(e[12], e[13], e[14])
                    }
                }(),
                setPosition: function(t) {
                    var e = this.elements;
                    return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
                },
                getInverse: function(t, e) {
                    var r = this.elements,
                        n = t.elements,
                        o = n[0],
                        a = n[4],
                        s = n[8],
                        h = n[12],
                        l = n[1],
                        c = n[5],
                        u = n[9],
                        f = n[13],
                        p = n[2],
                        d = n[6],
                        m = n[10],
                        g = n[14],
                        v = n[3],
                        y = n[7],
                        x = n[11],
                        b = n[15];
                    r[0] = u * g * y - f * m * y + f * d * x - c * g * x - u * d * b + c * m * b, r[4] = h * m * y - s * g * y - h * d * x + a * g * x + s * d * b - a * m * b, r[8] = s * f * y - h * u * y + h * c * x - a * f * x - s * c * b + a * u * b, r[12] = h * u * d - s * f * d - h * c * m + a * f * m + s * c * g - a * u * g, r[1] = f * m * v - u * g * v - f * p * x + l * g * x + u * p * b - l * m * b, r[5] = s * g * v - h * m * v + h * p * x - o * g * x - s * p * b + o * m * b, r[9] = h * u * v - s * f * v - h * l * x + o * f * x + s * l * b - o * u * b, r[13] = s * f * p - h * u * p + h * l * m - o * f * m - s * l * g + o * u * g, r[2] = c * g * v - f * d * v + f * p * y - l * g * y - c * p * b + l * d * b, r[6] = h * d * v - a * g * v - h * p * y + o * g * y + a * p * b - o * d * b, r[10] = a * f * v - h * c * v + h * l * y - o * f * y - a * l * b + o * c * b, r[14] = h * c * p - a * f * p - h * l * d + o * f * d + a * l * g - o * c * g, r[3] = u * d * v - c * m * v - u * p * y + l * m * y + c * p * x - l * d * x, r[7] = a * m * v - s * d * v + s * p * y - o * m * y - a * p * x + o * d * x, r[11] = s * c * v - a * u * v - s * l * y + o * u * y + a * l * x - o * c * x, r[15] = a * u * p - s * c * p + s * l * d - o * u * d - a * l * m + o * c * m;
                    var _ = o * r[0] + l * r[4] + p * r[8] + v * r[12];
                    if (0 == _) {
                        var w = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
                        if (e) throw new Error(w);
                        return i.warn(w), this.identity(), this
                    }
                    return this.multiplyScalar(1 / _), this
                },
                translate: function(t) {
                    i.error("THREE.Matrix4: .translate() has been removed.")
                },
                rotateX: function(t) {
                    i.error("THREE.Matrix4: .rotateX() has been removed.")
                },
                rotateY: function(t) {
                    i.error("THREE.Matrix4: .rotateY() has been removed.")
                },
                rotateZ: function(t) {
                    i.error("THREE.Matrix4: .rotateZ() has been removed.")
                },
                rotateByAxis: function(t, e) {
                    i.error("THREE.Matrix4: .rotateByAxis() has been removed.")
                },
                scale: function(t) {
                    var e = this.elements,
                        r = t.x,
                        i = t.y,
                        n = t.z;
                    return e[0] *= r, e[4] *= i, e[8] *= n, e[1] *= r, e[5] *= i, e[9] *= n, e[2] *= r, e[6] *= i, e[10] *= n, e[3] *= r, e[7] *= i, e[11] *= n, this
                },
                getMaxScaleOnAxis: function() {
                    var t = this.elements,
                        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
                        r = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
                        i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
                    return Math.sqrt(Math.max(e, Math.max(r, i)))
                },
                makeTranslation: function(t, e, r) {
                    return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, r, 0, 0, 0, 1), this
                },
                makeRotationX: function(t) {
                    var e = Math.cos(t),
                        r = Math.sin(t);
                    return this.set(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1), this
                },
                makeRotationY: function(t) {
                    var e = Math.cos(t),
                        r = Math.sin(t);
                    return this.set(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1), this
                },
                makeRotationZ: function(t) {
                    var e = Math.cos(t),
                        r = Math.sin(t);
                    return this.set(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                },
                makeRotationAxis: function(t, e) {
                    var r = Math.cos(e),
                        i = Math.sin(e),
                        n = 1 - r,
                        o = t.x,
                        a = t.y,
                        s = t.z,
                        h = n * o,
                        l = n * a;
                    return this.set(h * o + r, h * a - i * s, h * s + i * a, 0, h * a + i * s, l * a + r, l * s - i * o, 0, h * s - i * a, l * s + i * o, n * s * s + r, 0, 0, 0, 0, 1), this
                },
                makeScale: function(t, e, r) {
                    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
                },
                compose: function(t, e, r) {
                    return this.makeRotationFromQuaternion(e), this.scale(r), this.setPosition(t), this
                },
                decompose: function() {
                    var t = new i.Vector3,
                        e = new i.Matrix4;
                    return function(r, i, n) {
                        var o = this.elements,
                            a = t.set(o[0], o[1], o[2]).length(),
                            s = t.set(o[4], o[5], o[6]).length(),
                            h = t.set(o[8], o[9], o[10]).length(),
                            l = this.determinant();
                        l < 0 && (a = -a), r.x = o[12], r.y = o[13], r.z = o[14], e.elements.set(this.elements);
                        var c = 1 / a,
                            u = 1 / s,
                            f = 1 / h;
                        return e.elements[0] *= c, e.elements[1] *= c, e.elements[2] *= c, e.elements[4] *= u, e.elements[5] *= u, e.elements[6] *= u, e.elements[8] *= f, e.elements[9] *= f, e.elements[10] *= f, i.setFromRotationMatrix(e), n.x = a, n.y = s, n.z = h, this
                    }
                }(),
                makeFrustum: function(t, e, r, i, n, o) {
                    var a = this.elements,
                        s = 2 * n / (e - t),
                        h = 2 * n / (i - r),
                        l = (e + t) / (e - t),
                        c = (i + r) / (i - r),
                        u = -(o + n) / (o - n),
                        f = -2 * o * n / (o - n);
                    return a[0] = s, a[4] = 0, a[8] = l, a[12] = 0, a[1] = 0, a[5] = h, a[9] = c, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = f, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
                },
                makePerspective: function(t, e, r, n) {
                    var o = r * Math.tan(i.Math.degToRad(.5 * t)),
                        a = -o,
                        s = a * e,
                        h = o * e;
                    return this.makeFrustum(s, h, a, o, r, n)
                },
                makeOrthographic: function(t, e, r, i, n, o) {
                    var a = this.elements,
                        s = e - t,
                        h = r - i,
                        l = o - n,
                        c = (e + t) / s,
                        u = (r + i) / h,
                        f = (o + n) / l;
                    return a[0] = 2 / s, a[4] = 0, a[8] = 0, a[12] = -c, a[1] = 0, a[5] = 2 / h, a[9] = 0, a[13] = -u, a[2] = 0, a[6] = 0, a[10] = -2 / l, a[14] = -f, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
                },
                fromArray: function(t) {
                    return this.elements.set(t), this
                },
                toArray: function() {
                    var t = this.elements;
                    return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]]
                },
                clone: function() {
                    return (new i.Matrix4).fromArray(this.elements)
                }
            }, i.Ray = function(t, e) {
                this.origin = void 0 !== t ? t : new i.Vector3, this.direction = void 0 !== e ? e : new i.Vector3;
            }, i.Ray.prototype = {
                constructor: i.Ray,
                set: function(t, e) {
                    return this.origin.copy(t), this.direction.copy(e), this
                },
                copy: function(t) {
                    return this.origin.copy(t.origin), this.direction.copy(t.direction), this
                },
                at: function(t, e) {
                    var r = e || new i.Vector3;
                    return r.copy(this.direction).multiplyScalar(t).add(this.origin)
                },
                recast: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        return this.origin.copy(this.at(e, t)), this
                    }
                }(),
                closestPointToPoint: function(t, e) {
                    var r = e || new i.Vector3;
                    r.subVectors(t, this.origin);
                    var n = r.dot(this.direction);
                    return n < 0 ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(n).add(this.origin)
                },
                distanceToPoint: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        var r = t.subVectors(e, this.origin).dot(this.direction);
                        return r < 0 ? this.origin.distanceTo(e) : (t.copy(this.direction).multiplyScalar(r).add(this.origin), t.distanceTo(e))
                    }
                }(),
                distanceSqToSegment: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3,
                        r = new i.Vector3;
                    return function(i, n, o, a) {
                        t.copy(i).add(n).multiplyScalar(.5), e.copy(n).sub(i).normalize(), r.copy(this.origin).sub(t);
                        var s, h, l, c, u = .5 * i.distanceTo(n),
                            f = -this.direction.dot(e),
                            p = r.dot(this.direction),
                            d = -r.dot(e),
                            m = r.lengthSq(),
                            g = Math.abs(1 - f * f);
                        if (g > 0)
                            if (s = f * d - p, h = f * p - d, c = u * g, s >= 0)
                                if (h >= -c)
                                    if (h <= c) {
                                        var v = 1 / g;
                                        s *= v, h *= v, l = s * (s + f * h + 2 * p) + h * (f * s + h + 2 * d) + m
                                    } else h = u, s = Math.max(0, -(f * h + p)), l = -s * s + h * (h + 2 * d) + m;
                        else h = -u, s = Math.max(0, -(f * h + p)), l = -s * s + h * (h + 2 * d) + m;
                        else h <= -c ? (s = Math.max(0, -(-f * u + p)), h = s > 0 ? -u : Math.min(Math.max(-u, -d), u), l = -s * s + h * (h + 2 * d) + m) : h <= c ? (s = 0, h = Math.min(Math.max(-u, -d), u), l = h * (h + 2 * d) + m) : (s = Math.max(0, -(f * u + p)), h = s > 0 ? u : Math.min(Math.max(-u, -d), u), l = -s * s + h * (h + 2 * d) + m);
                        else h = f > 0 ? -u : u, s = Math.max(0, -(f * h + p)), l = -s * s + h * (h + 2 * d) + m;
                        return o && o.copy(this.direction).multiplyScalar(s).add(this.origin), a && a.copy(e).multiplyScalar(h).add(t), l
                    }
                }(),
                isIntersectionSphere: function(t) {
                    return this.distanceToPoint(t.center) <= t.radius
                },
                intersectSphere: function() {
                    var t = new i.Vector3;
                    return function(e, r) {
                        t.subVectors(e.center, this.origin);
                        var i = t.dot(this.direction),
                            n = t.dot(t) - i * i,
                            o = e.radius * e.radius;
                        if (n > o) return null;
                        var a = Math.sqrt(o - n),
                            s = i - a,
                            h = i + a;
                        return s < 0 && h < 0 ? null : s < 0 ? this.at(h, r) : this.at(s, r)
                    }
                }(),
                isIntersectionPlane: function(t) {
                    var e = t.distanceToPoint(this.origin);
                    if (0 === e) return !0;
                    var r = t.normal.dot(this.direction);
                    return r * e < 0
                },
                distanceToPlane: function(t) {
                    var e = t.normal.dot(this.direction);
                    if (0 == e) return 0 == t.distanceToPoint(this.origin) ? 0 : null;
                    var r = -(this.origin.dot(t.normal) + t.constant) / e;
                    return r >= 0 ? r : null
                },
                intersectPlane: function(t, e) {
                    var r = this.distanceToPlane(t);
                    return null === r ? null : this.at(r, e)
                },
                isIntersectionBox: function() {
                    var t = new i.Vector3;
                    return function(e) {
                        return null !== this.intersectBox(e, t)
                    }
                }(),
                intersectBox: function(t, e) {
                    var r, i, n, o, a, s, h = 1 / this.direction.x,
                        l = 1 / this.direction.y,
                        c = 1 / this.direction.z,
                        u = this.origin;
                    return h >= 0 ? (r = (t.min.x - u.x) * h, i = (t.max.x - u.x) * h) : (r = (t.max.x - u.x) * h, i = (t.min.x - u.x) * h), l >= 0 ? (n = (t.min.y - u.y) * l, o = (t.max.y - u.y) * l) : (n = (t.max.y - u.y) * l, o = (t.min.y - u.y) * l), r > o || n > i ? null : ((n > r || r !== r) && (r = n), (o < i || i !== i) && (i = o), c >= 0 ? (a = (t.min.z - u.z) * c, s = (t.max.z - u.z) * c) : (a = (t.max.z - u.z) * c, s = (t.min.z - u.z) * c), r > s || a > i ? null : ((a > r || r !== r) && (r = a), (s < i || i !== i) && (i = s), i < 0 ? null : this.at(r >= 0 ? r : i, e)))
                },
                intersectTriangle: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3,
                        r = new i.Vector3,
                        n = new i.Vector3;
                    return function(i, o, a, s, h) {
                        e.subVectors(o, i), r.subVectors(a, i), n.crossVectors(e, r);
                        var l, c = this.direction.dot(n);
                        if (c > 0) {
                            if (s) return null;
                            l = 1
                        } else {
                            if (!(c < 0)) return null;
                            l = -1, c = -c
                        }
                        t.subVectors(this.origin, i);
                        var u = l * this.direction.dot(r.crossVectors(t, r));
                        if (u < 0) return null;
                        var f = l * this.direction.dot(e.cross(t));
                        if (f < 0) return null;
                        if (u + f > c) return null;
                        var p = -l * t.dot(n);
                        return p < 0 ? null : this.at(p / c, h)
                    }
                }(),
                applyMatrix4: function(t) {
                    return this.direction.add(this.origin).applyMatrix4(t), this.origin.applyMatrix4(t), this.direction.sub(this.origin), this.direction.normalize(), this
                },
                equals: function(t) {
                    return t.origin.equals(this.origin) && t.direction.equals(this.direction)
                },
                clone: function() {
                    return (new i.Ray).copy(this)
                }
            }, i.Sphere = function(t, e) {
                this.center = void 0 !== t ? t : new i.Vector3, this.radius = void 0 !== e ? e : 0
            }, i.Sphere.prototype = {
                constructor: i.Sphere,
                set: function(t, e) {
                    return this.center.copy(t), this.radius = e, this
                },
                setFromPoints: function() {
                    var t = new i.Box3;
                    return function(e, r) {
                        var i = this.center;
                        void 0 !== r ? i.copy(r) : t.setFromPoints(e).center(i);
                        for (var n = 0, o = 0, a = e.length; o < a; o++) n = Math.max(n, i.distanceToSquared(e[o]));
                        return this.radius = Math.sqrt(n), this
                    }
                }(),
                copy: function(t) {
                    return this.center.copy(t.center), this.radius = t.radius, this
                },
                empty: function() {
                    return this.radius <= 0
                },
                containsPoint: function(t) {
                    return t.distanceToSquared(this.center) <= this.radius * this.radius
                },
                distanceToPoint: function(t) {
                    return t.distanceTo(this.center) - this.radius
                },
                intersectsSphere: function(t) {
                    var e = this.radius + t.radius;
                    return t.center.distanceToSquared(this.center) <= e * e
                },
                clampPoint: function(t, e) {
                    var r = this.center.distanceToSquared(t),
                        n = e || new i.Vector3;
                    return n.copy(t), r > this.radius * this.radius && (n.sub(this.center).normalize(), n.multiplyScalar(this.radius).add(this.center)), n
                },
                getBoundingBox: function(t) {
                    var e = t || new i.Box3;
                    return e.set(this.center, this.center), e.expandByScalar(this.radius), e
                },
                applyMatrix4: function(t) {
                    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
                },
                translate: function(t) {
                    return this.center.add(t), this
                },
                equals: function(t) {
                    return t.center.equals(this.center) && t.radius === this.radius
                },
                clone: function() {
                    return (new i.Sphere).copy(this)
                }
            }, i.Frustum = function(t, e, r, n, o, a) {
                this.planes = [void 0 !== t ? t : new i.Plane, void 0 !== e ? e : new i.Plane, void 0 !== r ? r : new i.Plane, void 0 !== n ? n : new i.Plane, void 0 !== o ? o : new i.Plane, void 0 !== a ? a : new i.Plane]
            }, i.Frustum.prototype = {
                constructor: i.Frustum,
                set: function(t, e, r, i, n, o) {
                    var a = this.planes;
                    return a[0].copy(t), a[1].copy(e), a[2].copy(r), a[3].copy(i), a[4].copy(n), a[5].copy(o), this
                },
                copy: function(t) {
                    for (var e = this.planes, r = 0; r < 6; r++) e[r].copy(t.planes[r]);
                    return this
                },
                setFromMatrix: function(t) {
                    var e = this.planes,
                        r = t.elements,
                        i = r[0],
                        n = r[1],
                        o = r[2],
                        a = r[3],
                        s = r[4],
                        h = r[5],
                        l = r[6],
                        c = r[7],
                        u = r[8],
                        f = r[9],
                        p = r[10],
                        d = r[11],
                        m = r[12],
                        g = r[13],
                        v = r[14],
                        y = r[15];
                    return e[0].setComponents(a - i, c - s, d - u, y - m).normalize(), e[1].setComponents(a + i, c + s, d + u, y + m).normalize(), e[2].setComponents(a + n, c + h, d + f, y + g).normalize(), e[3].setComponents(a - n, c - h, d - f, y - g).normalize(), e[4].setComponents(a - o, c - l, d - p, y - v).normalize(), e[5].setComponents(a + o, c + l, d + p, y + v).normalize(), this
                },
                intersectsObject: function() {
                    var t = new i.Sphere;
                    return function(e) {
                        var r = e.geometry;
                        return null === r.boundingSphere && r.computeBoundingSphere(), t.copy(r.boundingSphere), t.applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
                    }
                }(),
                intersectsSphere: function(t) {
                    for (var e = this.planes, r = t.center, i = -t.radius, n = 0; n < 6; n++) {
                        var o = e[n].distanceToPoint(r);
                        if (o < i) return !1
                    }
                    return !0
                },
                intersectsBox: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3;
                    return function(r) {
                        for (var i = this.planes, n = 0; n < 6; n++) {
                            var o = i[n];
                            t.x = o.normal.x > 0 ? r.min.x : r.max.x, e.x = o.normal.x > 0 ? r.max.x : r.min.x, t.y = o.normal.y > 0 ? r.min.y : r.max.y, e.y = o.normal.y > 0 ? r.max.y : r.min.y, t.z = o.normal.z > 0 ? r.min.z : r.max.z, e.z = o.normal.z > 0 ? r.max.z : r.min.z;
                            var a = o.distanceToPoint(t),
                                s = o.distanceToPoint(e);
                            if (a < 0 && s < 0) return !1
                        }
                        return !0
                    }
                }(),
                containsPoint: function(t) {
                    for (var e = this.planes, r = 0; r < 6; r++)
                        if (e[r].distanceToPoint(t) < 0) return !1;
                    return !0
                },
                clone: function() {
                    return (new i.Frustum).copy(this)
                }
            }, i.Plane = function(t, e) {
                this.normal = void 0 !== t ? t : new i.Vector3(1, 0, 0), this.constant = void 0 !== e ? e : 0
            }, i.Plane.prototype = {
                constructor: i.Plane,
                set: function(t, e) {
                    return this.normal.copy(t), this.constant = e, this
                },
                setComponents: function(t, e, r, i) {
                    return this.normal.set(t, e, r), this.constant = i, this
                },
                setFromNormalAndCoplanarPoint: function(t, e) {
                    return this.normal.copy(t), this.constant = -e.dot(this.normal), this
                },
                setFromCoplanarPoints: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3;
                    return function(r, i, n) {
                        var o = t.subVectors(n, i).cross(e.subVectors(r, i)).normalize();
                        return this.setFromNormalAndCoplanarPoint(o, r), this
                    }
                }(),
                copy: function(t) {
                    return this.normal.copy(t.normal), this.constant = t.constant, this
                },
                normalize: function() {
                    var t = 1 / this.normal.length();
                    return this.normal.multiplyScalar(t), this.constant *= t, this
                },
                negate: function() {
                    return this.constant *= -1, this.normal.negate(), this
                },
                distanceToPoint: function(t) {
                    return this.normal.dot(t) + this.constant
                },
                distanceToSphere: function(t) {
                    return this.distanceToPoint(t.center) - t.radius
                },
                projectPoint: function(t, e) {
                    return this.orthoPoint(t, e).sub(t).negate()
                },
                orthoPoint: function(t, e) {
                    var r = this.distanceToPoint(t),
                        n = e || new i.Vector3;
                    return n.copy(this.normal).multiplyScalar(r)
                },
                isIntersectionLine: function(t) {
                    var e = this.distanceToPoint(t.start),
                        r = this.distanceToPoint(t.end);
                    return e < 0 && r > 0 || r < 0 && e > 0
                },
                intersectLine: function() {
                    var t = new i.Vector3;
                    return function(e, r) {
                        var n = r || new i.Vector3,
                            o = e.delta(t),
                            a = this.normal.dot(o);
                        if (0 != a) {
                            var s = -(e.start.dot(this.normal) + this.constant) / a;
                            if (!(s < 0 || s > 1)) return n.copy(o).multiplyScalar(s).add(e.start)
                        } else if (0 == this.distanceToPoint(e.start)) return n.copy(e.start)
                    }
                }(),
                coplanarPoint: function(t) {
                    var e = t || new i.Vector3;
                    return e.copy(this.normal).multiplyScalar(-this.constant)
                },
                applyMatrix4: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3,
                        r = new i.Matrix3;
                    return function(i, n) {
                        var o = n || r.getNormalMatrix(i),
                            a = t.copy(this.normal).applyMatrix3(o),
                            s = this.coplanarPoint(e);
                        return s.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(a, s), this
                    }
                }(),
                translate: function(t) {
                    return this.constant = this.constant - t.dot(this.normal), this
                },
                equals: function(t) {
                    return t.normal.equals(this.normal) && t.constant == this.constant
                },
                clone: function() {
                    return (new i.Plane).copy(this)
                }
            }, i.Math = {
                generateUUID: function() {
                    var t, e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                        r = new Array(36),
                        i = 0;
                    return function() {
                        for (var n = 0; n < 36; n++) 8 == n || 13 == n || 18 == n || 23 == n ? r[n] = "-" : 14 == n ? r[n] = "4" : (i <= 2 && (i = 33554432 + 16777216 * Math.random() | 0), t = 15 & i, i >>= 4, r[n] = e[19 == n ? 3 & t | 8 : t]);
                        return r.join("")
                    }
                }(),
                clamp: function(t, e, r) {
                    return t < e ? e : t > r ? r : t
                },
                clampBottom: function(t, e) {
                    return t < e ? e : t
                },
                mapLinear: function(t, e, r, i, n) {
                    return i + (t - e) * (n - i) / (r - e)
                },
                smoothstep: function(t, e, r) {
                    return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e), t * t * (3 - 2 * t))
                },
                smootherstep: function(t, e, r) {
                    return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e), t * t * t * (t * (6 * t - 15) + 10))
                },
                random16: function() {
                    return (65280 * Math.random() + 255 * Math.random()) / 65535
                },
                randInt: function(t, e) {
                    return Math.floor(this.randFloat(t, e))
                },
                randFloat: function(t, e) {
                    return t + Math.random() * (e - t)
                },
                randFloatSpread: function(t) {
                    return t * (.5 - Math.random())
                },
                degToRad: function() {
                    var t = Math.PI / 180;
                    return function(e) {
                        return e * t
                    }
                }(),
                radToDeg: function() {
                    var t = 180 / Math.PI;
                    return function(e) {
                        return e * t
                    }
                }(),
                isPowerOfTwo: function(t) {
                    return 0 === (t & t - 1) && 0 !== t
                },
                nextPowerOfTwo: function(t) {
                    return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, t++, t
                }
            }, i.Spline = function(t) {
                function e(t, e, r, i, n, o, a) {
                    var s = .5 * (r - t),
                        h = .5 * (i - e);
                    return (2 * (e - r) + s + h) * a + (-3 * (e - r) - 2 * s - h) * o + s * n + e
                }
                this.points = t;
                var r, n, o, a, s, h, l, c, u, f = [],
                    p = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                this.initFromArray = function(t) {
                    this.points = [];
                    for (var e = 0; e < t.length; e++) this.points[e] = {
                        x: t[e][0],
                        y: t[e][1],
                        z: t[e][2]
                    }
                }, this.getPoint = function(t) {
                    return r = (this.points.length - 1) * t, n = Math.floor(r), o = r - n, f[0] = 0 === n ? n : n - 1, f[1] = n, f[2] = n > this.points.length - 2 ? this.points.length - 1 : n + 1, f[3] = n > this.points.length - 3 ? this.points.length - 1 : n + 2, h = this.points[f[0]], l = this.points[f[1]], c = this.points[f[2]], u = this.points[f[3]], a = o * o, s = o * a, p.x = e(h.x, l.x, c.x, u.x, o, a, s), p.y = e(h.y, l.y, c.y, u.y, o, a, s), p.z = e(h.z, l.z, c.z, u.z, o, a, s), p
                }, this.getControlPointsArray = function() {
                    var t, e, r = this.points.length,
                        i = [];
                    for (t = 0; t < r; t++) e = this.points[t], i[t] = [e.x, e.y, e.z];
                    return i
                }, this.getLength = function(t) {
                    var e, r, n, o, a = 0,
                        s = 0,
                        h = 0,
                        l = new i.Vector3,
                        c = new i.Vector3,
                        u = [],
                        f = 0;
                    for (u[0] = 0, t || (t = 100), n = this.points.length * t, l.copy(this.points[0]), e = 1; e < n; e++) r = e / n, o = this.getPoint(r), c.copy(o), f += c.distanceTo(l), l.copy(o), a = (this.points.length - 1) * r, s = Math.floor(a), s != h && (u[s] = f, h = s);
                    return u[u.length] = f, {
                        chunks: u,
                        total: f
                    }
                }, this.reparametrizeByArcLength = function(t) {
                    var e, r, n, o, a, s, h, l, c = [],
                        u = new i.Vector3,
                        f = this.getLength();
                    for (c.push(u.copy(this.points[0]).clone()), e = 1; e < this.points.length; e++) {
                        for (s = f.chunks[e] - f.chunks[e - 1], h = Math.ceil(t * s / f.total), o = (e - 1) / (this.points.length - 1), a = e / (this.points.length - 1), r = 1; r < h - 1; r++) n = o + r * (1 / h) * (a - o), l = this.getPoint(n), c.push(u.copy(l).clone());
                        c.push(u.copy(this.points[e]).clone())
                    }
                    this.points = c
                }
            }, i.Triangle = function(t, e, r) {
                this.a = void 0 !== t ? t : new i.Vector3, this.b = void 0 !== e ? e : new i.Vector3, this.c = void 0 !== r ? r : new i.Vector3
            }, i.Triangle.normal = function() {
                var t = new i.Vector3;
                return function(e, r, n, o) {
                    var a = o || new i.Vector3;
                    a.subVectors(n, r), t.subVectors(e, r), a.cross(t);
                    var s = a.lengthSq();
                    return s > 0 ? a.multiplyScalar(1 / Math.sqrt(s)) : a.set(0, 0, 0)
                }
            }(), i.Triangle.barycoordFromPoint = function() {
                var t = new i.Vector3,
                    e = new i.Vector3,
                    r = new i.Vector3;
                return function(n, o, a, s, h) {
                    t.subVectors(s, o), e.subVectors(a, o), r.subVectors(n, o);
                    var l = t.dot(t),
                        c = t.dot(e),
                        u = t.dot(r),
                        f = e.dot(e),
                        p = e.dot(r),
                        d = l * f - c * c,
                        m = h || new i.Vector3;
                    if (0 == d) return m.set(-2, -1, -1);
                    var g = 1 / d,
                        v = (f * u - c * p) * g,
                        y = (l * p - c * u) * g;
                    return m.set(1 - v - y, y, v)
                }
            }(), i.Triangle.containsPoint = function() {
                var t = new i.Vector3;
                return function(e, r, n, o) {
                    var a = i.Triangle.barycoordFromPoint(e, r, n, o, t);
                    return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1
                }
            }(), i.Triangle.prototype = {
                constructor: i.Triangle,
                set: function(t, e, r) {
                    return this.a.copy(t), this.b.copy(e), this.c.copy(r), this
                },
                setFromPointsAndIndices: function(t, e, r, i) {
                    return this.a.copy(t[e]), this.b.copy(t[r]), this.c.copy(t[i]), this
                },
                copy: function(t) {
                    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
                },
                area: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3;
                    return function() {
                        return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length()
                    }
                }(),
                midpoint: function(t) {
                    var e = t || new i.Vector3;
                    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
                },
                normal: function(t) {
                    return i.Triangle.normal(this.a, this.b, this.c, t)
                },
                plane: function(t) {
                    var e = t || new i.Plane;
                    return e.setFromCoplanarPoints(this.a, this.b, this.c)
                },
                barycoordFromPoint: function(t, e) {
                    return i.Triangle.barycoordFromPoint(t, this.a, this.b, this.c, e)
                },
                containsPoint: function(t) {
                    return i.Triangle.containsPoint(t, this.a, this.b, this.c)
                },
                equals: function(t) {
                    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
                },
                clone: function() {
                    return (new i.Triangle).copy(this)
                }
            }, i.Clock = function(t) {
                this.autoStart = void 0 === t || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
            }, i.Clock.prototype = {
                constructor: i.Clock,
                start: function() {
                    this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(), this.oldTime = this.startTime, this.running = !0
                },
                stop: function() {
                    this.getElapsedTime(), this.running = !1
                },
                getElapsedTime: function() {
                    return this.getDelta(), this.elapsedTime
                },
                getDelta: function() {
                    var t = 0;
                    if (this.autoStart && !this.running && this.start(), this.running) {
                        var e = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now();
                        t = .001 * (e - this.oldTime), this.oldTime = e, this.elapsedTime += t
                    }
                    return t
                }
            }, i.EventDispatcher = function() {}, i.EventDispatcher.prototype = {
                constructor: i.EventDispatcher,
                apply: function(t) {
                    t.addEventListener = i.EventDispatcher.prototype.addEventListener, t.hasEventListener = i.EventDispatcher.prototype.hasEventListener, t.removeEventListener = i.EventDispatcher.prototype.removeEventListener, t.dispatchEvent = i.EventDispatcher.prototype.dispatchEvent
                },
                addEventListener: function(t, e) {
                    void 0 === this._listeners && (this._listeners = {});
                    var r = this._listeners;
                    void 0 === r[t] && (r[t] = []), r[t].indexOf(e) === -1 && r[t].push(e)
                },
                hasEventListener: function(t, e) {
                    if (void 0 === this._listeners) return !1;
                    var r = this._listeners;
                    return void 0 !== r[t] && r[t].indexOf(e) !== -1
                },
                removeEventListener: function(t, e) {
                    if (void 0 !== this._listeners) {
                        var r = this._listeners,
                            i = r[t];
                        if (void 0 !== i) {
                            var n = i.indexOf(e);
                            n !== -1 && i.splice(n, 1)
                        }
                    }
                },
                dispatchEvent: function(t) {
                    if (void 0 !== this._listeners) {
                        var e = this._listeners,
                            r = e[t.type];
                        if (void 0 !== r) {
                            t.target = this;
                            for (var i = [], n = r.length, o = 0; o < n; o++) i[o] = r[o];
                            for (var o = 0; o < n; o++) i[o].call(this, t)
                        }
                    }
                }
            },
            function(t) {
                t.Raycaster = function(e, r, i, n) {
                    this.ray = new t.Ray(e, r), this.near = i || 0, this.far = n || 1 / 0, this.params = {
                        Sprite: {},
                        Mesh: {},
                        PointCloud: {
                            threshold: 1
                        },
                        LOD: {},
                        Line: {}
                    }
                };
                var e = function(t, e) {
                        return t.distance - e.distance
                    },
                    r = function(t, e, i, n) {
                        if (t.raycast(e, i), n === !0)
                            for (var o = t.children, a = 0, s = o.length; a < s; a++) r(o[a], e, i, !0)
                    };
                t.Raycaster.prototype = {
                    constructor: t.Raycaster,
                    precision: 1e-4,
                    linePrecision: 1,
                    set: function(t, e) {
                        this.ray.set(t, e)
                    },
                    setFromCamera: function(e, r) {
                        r instanceof t.PerspectiveCamera ? (this.ray.origin.copy(r.position), this.ray.direction.set(e.x, e.y, .5).unproject(r).sub(r.position).normalize()) : r instanceof t.OrthographicCamera ? (this.ray.origin.set(e.x, e.y, -1).unproject(r), this.ray.direction.set(0, 0, -1).transformDirection(r.matrixWorld)) : t.error("THREE.Raycaster: Unsupported camera type.")
                    },
                    intersectObject: function(t, i) {
                        var n = [];
                        return r(t, this, n, i), n.sort(e), n
                    },
                    intersectObjects: function(i, n) {
                        var o = [];
                        if (i instanceof Array == !1) return t.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), o;
                        for (var a = 0, s = i.length; a < s; a++) r(i[a], this, o, n);
                        return o.sort(e), o
                    }
                }
            }(i), i.Object3D = function() {
                Object.defineProperty(this, "id", {
                    value: i.Object3DIdCount++
                }), this.uuid = i.Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = void 0, this.children = [], this.up = i.Object3D.DefaultUp.clone();
                var t = new i.Vector3,
                    e = new i.Euler,
                    r = new i.Quaternion,
                    n = new i.Vector3(1, 1, 1),
                    o = function() {
                        r.setFromEuler(e, !1)
                    },
                    a = function() {
                        e.setFromQuaternion(r, void 0, !1)
                    };
                e.onChange(o), r.onChange(a), Object.defineProperties(this, {
                    position: {
                        enumerable: !0,
                        value: t
                    },
                    rotation: {
                        enumerable: !0,
                        value: e
                    },
                    quaternion: {
                        enumerable: !0,
                        value: r
                    },
                    scale: {
                        enumerable: !0,
                        value: n
                    }
                }), this.rotationAutoUpdate = !0, this.matrix = new i.Matrix4, this.matrixWorld = new i.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
            }, i.Object3D.DefaultUp = new i.Vector3(0, 1, 0), i.Object3D.prototype = {
                constructor: i.Object3D,
                get eulerOrder() {
                    return i.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
                },
                set eulerOrder(t) {
                    i.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order = t
                },
                get useQuaternion() {
                    i.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                },
                set useQuaternion(t) {
                    i.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                },
                applyMatrix: function(t) {
                    this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
                },
                setRotationFromAxisAngle: function(t, e) {
                    this.quaternion.setFromAxisAngle(t, e)
                },
                setRotationFromEuler: function(t) {
                    this.quaternion.setFromEuler(t, !0)
                },
                setRotationFromMatrix: function(t) {
                    this.quaternion.setFromRotationMatrix(t)
                },
                setRotationFromQuaternion: function(t) {
                    this.quaternion.copy(t)
                },
                rotateOnAxis: function() {
                    var t = new i.Quaternion;
                    return function(e, r) {
                        return t.setFromAxisAngle(e, r), this.quaternion.multiply(t), this
                    }
                }(),
                rotateX: function() {
                    var t = new i.Vector3(1, 0, 0);
                    return function(e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(),
                rotateY: function() {
                    var t = new i.Vector3(0, 1, 0);
                    return function(e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(),
                rotateZ: function() {
                    var t = new i.Vector3(0, 0, 1);
                    return function(e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(),
                translateOnAxis: function() {
                    var t = new i.Vector3;
                    return function(e, r) {
                        return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(r)), this
                    }
                }(),
                translate: function(t, e) {
                    return i.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t)
                },
                translateX: function() {
                    var t = new i.Vector3(1, 0, 0);
                    return function(e) {
                        return this.translateOnAxis(t, e)
                    }
                }(),
                translateY: function() {
                    var t = new i.Vector3(0, 1, 0);
                    return function(e) {
                        return this.translateOnAxis(t, e)
                    }
                }(),
                translateZ: function() {
                    var t = new i.Vector3(0, 0, 1);
                    return function(e) {
                        return this.translateOnAxis(t, e)
                    }
                }(),
                localToWorld: function(t) {
                    return t.applyMatrix4(this.matrixWorld)
                },
                worldToLocal: function() {
                    var t = new i.Matrix4;
                    return function(e) {
                        return e.applyMatrix4(t.getInverse(this.matrixWorld))
                    }
                }(),
                lookAt: function() {
                    var t = new i.Matrix4;
                    return function(e) {
                        t.lookAt(e, this.position, this.up), this.quaternion.setFromRotationMatrix(t)
                    }
                }(),
                add: function(t) {
                    if (arguments.length > 1) {
                        for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                        return this
                    }
                    return t === this ? (i.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t instanceof i.Object3D ? (void 0 !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({
                        type: "added"
                    }), this.children.push(t)) : i.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
                },
                remove: function(t) {
                    if (arguments.length > 1)
                        for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                    var r = this.children.indexOf(t);
                    r !== -1 && (t.parent = void 0, t.dispatchEvent({
                        type: "removed"
                    }), this.children.splice(r, 1))
                },
                getChildByName: function(t) {
                    return i.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t)
                },
                getObjectById: function(t) {
                    return this.getObjectByProperty("id", t)
                },
                getObjectByName: function(t) {
                    return this.getObjectByProperty("name", t)
                },
                getObjectByProperty: function(t, e) {
                    if (this[t] === e) return this;
                    for (var r = 0, i = this.children.length; r < i; r++) {
                        var n = this.children[r],
                            o = n.getObjectByProperty(t, e);
                        if (void 0 !== o) return o
                    }
                },
                getWorldPosition: function(t) {
                    var e = t || new i.Vector3;
                    return this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
                },
                getWorldQuaternion: function() {
                    var t = new i.Vector3,
                        e = new i.Vector3;
                    return function(r) {
                        var n = r || new i.Quaternion;
                        return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, n, e), n
                    }
                }(),
                getWorldRotation: function() {
                    var t = new i.Quaternion;
                    return function(e) {
                        var r = e || new i.Euler;
                        return this.getWorldQuaternion(t), r.setFromQuaternion(t, this.rotation.order, !1)
                    }
                }(),
                getWorldScale: function() {
                    var t = new i.Vector3,
                        e = new i.Quaternion;
                    return function(r) {
                        var n = r || new i.Vector3;
                        return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, n), n
                    }
                }(),
                getWorldDirection: function() {
                    var t = new i.Quaternion;
                    return function(e) {
                        var r = e || new i.Vector3;
                        return this.getWorldQuaternion(t), r.set(0, 0, 1).applyQuaternion(t)
                    }
                }(),
                raycast: function() {},
                traverse: function(t) {
                    t(this);
                    for (var e = 0, r = this.children.length; e < r; e++) this.children[e].traverse(t)
                },
                traverseVisible: function(t) {
                    if (this.visible !== !1) {
                        t(this);
                        for (var e = 0, r = this.children.length; e < r; e++) this.children[e].traverseVisible(t)
                    }
                },
                traverseAncestors: function(t) {
                    this.parent && (t(this.parent), this.parent.traverseAncestors(t))
                },
                updateMatrix: function() {
                    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
                },
                updateMatrixWorld: function(t) {
                    this.matrixAutoUpdate === !0 && this.updateMatrix(), this.matrixWorldNeedsUpdate !== !0 && t !== !0 || (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
                    for (var e = 0, r = this.children.length; e < r; e++) this.children[e].updateMatrixWorld(t)
                },
                toJSON: function() {
                    var t = {
                            metadata: {
                                version: 4.3,
                                type: "Object",
                                generator: "ObjectExporter"
                            }
                        },
                        e = {},
                        r = function(r) {
                            if (void 0 === t.geometries && (t.geometries = []), void 0 === e[r.uuid]) {
                                var i = r.toJSON();
                                delete i.metadata, e[r.uuid] = i, t.geometries.push(i)
                            }
                            return r.uuid
                        },
                        n = {},
                        o = function(e) {
                            if (void 0 === t.materials && (t.materials = []), void 0 === n[e.uuid]) {
                                var r = e.toJSON();
                                delete r.metadata, n[e.uuid] = r, t.materials.push(r)
                            }
                            return e.uuid
                        },
                        a = function(t) {
                            var e = {};
                            if (e.uuid = t.uuid, e.type = t.type, "" !== t.name && (e.name = t.name), "{}" !== JSON.stringify(t.userData) && (e.userData = t.userData), t.visible !== !0 && (e.visible = t.visible), t instanceof i.PerspectiveCamera ? (e.fov = t.fov, e.aspect = t.aspect, e.near = t.near, e.far = t.far) : t instanceof i.OrthographicCamera ? (e.left = t.left, e.right = t.right, e.top = t.top, e.bottom = t.bottom, e.near = t.near, e.far = t.far) : t instanceof i.AmbientLight ? e.color = t.color.getHex() : t instanceof i.DirectionalLight ? (e.color = t.color.getHex(), e.intensity = t.intensity) : t instanceof i.PointLight ? (e.color = t.color.getHex(), e.intensity = t.intensity, e.distance = t.distance, e.decay = t.decay) : t instanceof i.SpotLight ? (e.color = t.color.getHex(), e.intensity = t.intensity, e.distance = t.distance, e.angle = t.angle, e.exponent = t.exponent, e.decay = t.decay) : t instanceof i.HemisphereLight ? (e.color = t.color.getHex(), e.groundColor = t.groundColor.getHex()) : t instanceof i.Mesh || t instanceof i.Line || t instanceof i.PointCloud ? (e.geometry = r(t.geometry), e.material = o(t.material), t instanceof i.Line && (e.mode = t.mode)) : t instanceof i.Sprite && (e.material = o(t.material)), e.matrix = t.matrix.toArray(), t.children.length > 0) {
                                e.children = [];
                                for (var n = 0; n < t.children.length; n++) e.children.push(a(t.children[n]))
                            }
                            return e
                        };
                    return t.object = a(this), t
                },
                clone: function(t, e) {
                    if (void 0 === t && (t = new i.Object3D), void 0 === e && (e = !0), t.name = this.name, t.up.copy(this.up), t.position.copy(this.position), t.quaternion.copy(this.quaternion), t.scale.copy(this.scale), t.rotationAutoUpdate = this.rotationAutoUpdate, t.matrix.copy(this.matrix), t.matrixWorld.copy(this.matrixWorld), t.matrixAutoUpdate = this.matrixAutoUpdate, t.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, t.visible = this.visible, t.castShadow = this.castShadow, t.receiveShadow = this.receiveShadow, t.frustumCulled = this.frustumCulled, t.userData = JSON.parse(JSON.stringify(this.userData)), e === !0)
                        for (var r = 0; r < this.children.length; r++) {
                            var n = this.children[r];
                            t.add(n.clone())
                        }
                    return t
                }
            }, i.EventDispatcher.prototype.apply(i.Object3D.prototype), i.Object3DIdCount = 0, i.Face3 = function(t, e, r, n, o, a) {
                this.a = t, this.b = e, this.c = r, this.normal = n instanceof i.Vector3 ? n : new i.Vector3, this.vertexNormals = n instanceof Array ? n : [], this.color = o instanceof i.Color ? o : new i.Color, this.vertexColors = o instanceof Array ? o : [], this.vertexTangents = [], this.materialIndex = void 0 !== a ? a : 0
            }, i.Face3.prototype = {
                constructor: i.Face3,
                clone: function() {
                    var t = new i.Face3(this.a, this.b, this.c);
                    t.normal.copy(this.normal), t.color.copy(this.color), t.materialIndex = this.materialIndex;
                    for (var e = 0, r = this.vertexNormals.length; e < r; e++) t.vertexNormals[e] = this.vertexNormals[e].clone();
                    for (var e = 0, r = this.vertexColors.length; e < r; e++) t.vertexColors[e] = this.vertexColors[e].clone();
                    for (var e = 0, r = this.vertexTangents.length; e < r; e++) t.vertexTangents[e] = this.vertexTangents[e].clone();
                    return t
                }
            }, i.Face4 = function(t, e, r, n, o, a, s) {
                return i.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new i.Face3(t, e, r, o, a, s)
            }, i.BufferAttribute = function(t, e) {
                this.array = t, this.itemSize = e, this.needsUpdate = !1
            }, i.BufferAttribute.prototype = {
                constructor: i.BufferAttribute,
                get length() {
                    return this.array.length
                },
                copyAt: function(t, e, r) {
                    t *= this.itemSize, r *= e.itemSize;
                    for (var i = 0, n = this.itemSize; i < n; i++) this.array[t + i] = e.array[r + i];
                    return this
                },
                set: function(t, e) {
                    return void 0 === e && (e = 0), this.array.set(t, e), this
                },
                setX: function(t, e) {
                    return this.array[t * this.itemSize] = e, this
                },
                setY: function(t, e) {
                    return this.array[t * this.itemSize + 1] = e, this
                },
                setZ: function(t, e) {
                    return this.array[t * this.itemSize + 2] = e, this
                },
                setXY: function(t, e, r) {
                    return t *= this.itemSize, this.array[t] = e, this.array[t + 1] = r, this
                },
                setXYZ: function(t, e, r, i) {
                    return t *= this.itemSize, this.array[t] = e, this.array[t + 1] = r, this.array[t + 2] = i, this
                },
                setXYZW: function(t, e, r, i, n) {
                    return t *= this.itemSize, this.array[t] = e, this.array[t + 1] = r, this.array[t + 2] = i, this.array[t + 3] = n, this
                },
                clone: function() {
                    return new i.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
                }
            }, i.Int8Attribute = function(t, e) {
                return i.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Uint8Attribute = function(t, e) {
                return i.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Uint8ClampedAttribute = function(t, e) {
                return i.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Int16Attribute = function(t, e) {
                return i.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Uint16Attribute = function(t, e) {
                return i.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Int32Attribute = function(t, e) {
                return i.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Uint32Attribute = function(t, e) {
                return i.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Float32Attribute = function(t, e) {
                return i.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.Float64Attribute = function(t, e) {
                return i.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new i.BufferAttribute(t, e)
            }, i.DynamicBufferAttribute = function(t, e) {
                i.BufferAttribute.call(this, t, e), this.updateRange = {
                    offset: 0,
                    count: -1
                }
            }, i.DynamicBufferAttribute.prototype = Object.create(i.BufferAttribute.prototype), i.DynamicBufferAttribute.prototype.constructor = i.DynamicBufferAttribute, i.DynamicBufferAttribute.prototype.clone = function() {
                return new i.DynamicBufferAttribute(new this.array.constructor(this.array), this.itemSize)
            }, i.BufferGeometry = function() {
                Object.defineProperty(this, "id", {
                    value: i.GeometryIdCount++
                }), this.uuid = i.Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.attributes = {}, this.attributesKeys = [], this.drawcalls = [], this.offsets = this.drawcalls, this.boundingBox = null, this.boundingSphere = null
            }, i.BufferGeometry.prototype = {
                constructor: i.BufferGeometry,
                addAttribute: function(t, e) {
                    return e instanceof i.BufferAttribute == !1 ? (i.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void(this.attributes[t] = {
                        array: arguments[1],
                        itemSize: arguments[2]
                    })) : (this.attributes[t] = e, void(this.attributesKeys = Object.keys(this.attributes)))
                },
                getAttribute: function(t) {
                    return this.attributes[t]
                },
                addDrawCall: function(t, e, r) {
                    this.drawcalls.push({
                        start: t,
                        count: e,
                        index: void 0 !== r ? r : 0
                    })
                },
                applyMatrix: function(t) {
                    var e = this.attributes.position;
                    void 0 !== e && (t.applyToVector3Array(e.array), e.needsUpdate = !0);
                    var r = this.attributes.normal;
                    if (void 0 !== r) {
                        var n = (new i.Matrix3).getNormalMatrix(t);
                        n.applyToVector3Array(r.array), r.needsUpdate = !0
                    }
                    null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere()
                },
                center: function() {
                    this.computeBoundingBox();
                    var t = this.boundingBox.center().negate();
                    return this.applyMatrix((new i.Matrix4).setPosition(t)), t
                },
                fromGeometry: function(t, e) {
                    e = e || {
                        vertexColors: i.NoColors
                    };
                    var r = t.vertices,
                        n = t.faces,
                        o = t.faceVertexUvs,
                        a = e.vertexColors,
                        s = o[0].length > 0,
                        h = 3 == n[0].vertexNormals.length,
                        l = new Float32Array(3 * n.length * 3);
                    this.addAttribute("position", new i.BufferAttribute(l, 3));
                    var c = new Float32Array(3 * n.length * 3);
                    if (this.addAttribute("normal", new i.BufferAttribute(c, 3)), a !== i.NoColors) {
                        var u = new Float32Array(3 * n.length * 3);
                        this.addAttribute("color", new i.BufferAttribute(u, 3))
                    }
                    if (s === !0) {
                        var f = new Float32Array(3 * n.length * 2);
                        this.addAttribute("uv", new i.BufferAttribute(f, 2))
                    }
                    for (var p = 0, d = 0, m = 0; p < n.length; p++, d += 6, m += 9) {
                        var g = n[p],
                            v = r[g.a],
                            y = r[g.b],
                            x = r[g.c];
                        if (l[m] = v.x, l[m + 1] = v.y, l[m + 2] = v.z, l[m + 3] = y.x, l[m + 4] = y.y, l[m + 5] = y.z, l[m + 6] = x.x, l[m + 7] = x.y, l[m + 8] = x.z, h === !0) {
                            var b = g.vertexNormals[0],
                                _ = g.vertexNormals[1],
                                w = g.vertexNormals[2];
                            c[m] = b.x, c[m + 1] = b.y, c[m + 2] = b.z, c[m + 3] = _.x, c[m + 4] = _.y, c[m + 5] = _.z, c[m + 6] = w.x, c[m + 7] = w.y, c[m + 8] = w.z
                        } else {
                            var M = g.normal;
                            c[m] = M.x, c[m + 1] = M.y, c[m + 2] = M.z, c[m + 3] = M.x, c[m + 4] = M.y, c[m + 5] = M.z, c[m + 6] = M.x, c[m + 7] = M.y, c[m + 8] = M.z
                        }
                        if (a === i.FaceColors) {
                            var S = g.color;
                            u[m] = S.r, u[m + 1] = S.g, u[m + 2] = S.b, u[m + 3] = S.r, u[m + 4] = S.g, u[m + 5] = S.b, u[m + 6] = S.r, u[m + 7] = S.g, u[m + 8] = S.b
                        } else if (a === i.VertexColors) {
                            var T = g.vertexColors[0],
                                E = g.vertexColors[1],
                                C = g.vertexColors[2];
                            u[m] = T.r, u[m + 1] = T.g, u[m + 2] = T.b, u[m + 3] = E.r, u[m + 4] = E.g, u[m + 5] = E.b, u[m + 6] = C.r,
                                u[m + 7] = C.g, u[m + 8] = C.b
                        }
                        if (s === !0) {
                            var A = o[0][p][0],
                                L = o[0][p][1],
                                P = o[0][p][2];
                            f[d] = A.x, f[d + 1] = A.y, f[d + 2] = L.x, f[d + 3] = L.y, f[d + 4] = P.x, f[d + 5] = P.y
                        }
                    }
                    return this.computeBoundingSphere(), this
                },
                computeBoundingBox: function() {
                    var t = new i.Vector3;
                    return function() {
                        null === this.boundingBox && (this.boundingBox = new i.Box3);
                        var e = this.attributes.position.array;
                        if (e) {
                            var r = this.boundingBox;
                            r.makeEmpty();
                            for (var n = 0, o = e.length; n < o; n += 3) t.set(e[n], e[n + 1], e[n + 2]), r.expandByPoint(t)
                        }
                        void 0 !== e && 0 !== e.length || (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && i.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
                    }
                }(),
                computeBoundingSphere: function() {
                    var t = new i.Box3,
                        e = new i.Vector3;
                    return function() {
                        null === this.boundingSphere && (this.boundingSphere = new i.Sphere);
                        var r = this.attributes.position.array;
                        if (r) {
                            t.makeEmpty();
                            for (var n = this.boundingSphere.center, o = 0, a = r.length; o < a; o += 3) e.set(r[o], r[o + 1], r[o + 2]), t.expandByPoint(e);
                            t.center(n);
                            for (var s = 0, o = 0, a = r.length; o < a; o += 3) e.set(r[o], r[o + 1], r[o + 2]), s = Math.max(s, n.distanceToSquared(e));
                            this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && i.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
                        }
                    }
                }(),
                computeFaceNormals: function() {},
                computeVertexNormals: function() {
                    var t = this.attributes;
                    if (t.position) {
                        var e = t.position.array;
                        if (void 0 === t.normal) this.addAttribute("normal", new i.BufferAttribute(new Float32Array(e.length), 3));
                        else
                            for (var r = t.normal.array, n = 0, o = r.length; n < o; n++) r[n] = 0;
                        var a, s, h, r = t.normal.array,
                            l = new i.Vector3,
                            c = new i.Vector3,
                            u = new i.Vector3,
                            f = new i.Vector3,
                            p = new i.Vector3;
                        if (t.index)
                            for (var d = t.index.array, m = this.offsets.length > 0 ? this.offsets : [{
                                    start: 0,
                                    count: d.length,
                                    index: 0
                                }], g = 0, v = m.length; g < v; ++g)
                                for (var y = m[g].start, x = m[g].count, b = m[g].index, n = y, o = y + x; n < o; n += 3) a = 3 * (b + d[n]), s = 3 * (b + d[n + 1]), h = 3 * (b + d[n + 2]), l.fromArray(e, a), c.fromArray(e, s), u.fromArray(e, h), f.subVectors(u, c), p.subVectors(l, c), f.cross(p), r[a] += f.x, r[a + 1] += f.y, r[a + 2] += f.z, r[s] += f.x, r[s + 1] += f.y, r[s + 2] += f.z, r[h] += f.x, r[h + 1] += f.y, r[h + 2] += f.z;
                        else
                            for (var n = 0, o = e.length; n < o; n += 9) l.fromArray(e, n), c.fromArray(e, n + 3), u.fromArray(e, n + 6), f.subVectors(u, c), p.subVectors(l, c), f.cross(p), r[n] = f.x, r[n + 1] = f.y, r[n + 2] = f.z, r[n + 3] = f.x, r[n + 4] = f.y, r[n + 5] = f.z, r[n + 6] = f.x, r[n + 7] = f.y, r[n + 8] = f.z;
                        this.normalizeNormals(), t.normal.needsUpdate = !0
                    }
                },
                computeTangents: function() {
                    function t(t, e, r) {
                        P.fromArray(n, 3 * t), R.fromArray(n, 3 * e), F.fromArray(n, 3 * r), D.fromArray(a, 2 * t), B.fromArray(a, 2 * e), U.fromArray(a, 2 * r), f = R.x - P.x, p = F.x - P.x, d = R.y - P.y, m = F.y - P.y, g = R.z - P.z, v = F.z - P.z, y = B.x - D.x, x = U.x - D.x, b = B.y - D.y, _ = U.y - D.y, w = 1 / (y * _ - x * b), V.set((_ * f - b * p) * w, (_ * d - b * m) * w, (_ * g - b * v) * w), O.set((y * p - x * f) * w, (y * m - x * d) * w, (y * v - x * g) * w), l[t].add(V), l[e].add(V), l[r].add(V), c[t].add(O), c[e].add(O), c[r].add(O)
                    }

                    function e(t) {
                        q.fromArray(o, 3 * t), Y.copy(q), H = l[t], j.copy(H), j.sub(q.multiplyScalar(q.dot(H))).normalize(), X.crossVectors(Y, H), W = X.dot(c[t]), G = W < 0 ? -1 : 1, h[4 * t] = j.x, h[4 * t + 1] = j.y, h[4 * t + 2] = j.z, h[4 * t + 3] = G
                    }
                    if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) return void i.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
                    var r = this.attributes.index.array,
                        n = this.attributes.position.array,
                        o = this.attributes.normal.array,
                        a = this.attributes.uv.array,
                        s = n.length / 3;
                    void 0 === this.attributes.tangent && this.addAttribute("tangent", new i.BufferAttribute(new Float32Array(4 * s), 4));
                    for (var h = this.attributes.tangent.array, l = [], c = [], u = 0; u < s; u++) l[u] = new i.Vector3, c[u] = new i.Vector3;
                    var f, p, d, m, g, v, y, x, b, _, w, M, S, T, E, C, A, L, P = new i.Vector3,
                        R = new i.Vector3,
                        F = new i.Vector3,
                        D = new i.Vector2,
                        B = new i.Vector2,
                        U = new i.Vector2,
                        V = new i.Vector3,
                        O = new i.Vector3;
                    0 === this.drawcalls.length && this.addDrawCall(0, r.length, 0);
                    var z = this.drawcalls;
                    for (T = 0, E = z.length; T < E; ++T) {
                        var k = z[T].start,
                            N = z[T].count,
                            I = z[T].index;
                        for (M = k, S = k + N; M < S; M += 3) C = I + r[M], A = I + r[M + 1], L = I + r[M + 2], t(C, A, L)
                    }
                    var G, H, W, j = new i.Vector3,
                        X = new i.Vector3,
                        q = new i.Vector3,
                        Y = new i.Vector3;
                    for (T = 0, E = z.length; T < E; ++T) {
                        var k = z[T].start,
                            N = z[T].count,
                            I = z[T].index;
                        for (M = k, S = k + N; M < S; M += 3) C = I + r[M], A = I + r[M + 1], L = I + r[M + 2], e(C), e(A), e(L)
                    }
                },
                computeOffsets: function(t) {
                    void 0 === t && (t = 65535);
                    for (var e = this.attributes.index.array, r = this.attributes.position.array, i = e.length / 3, n = new Uint16Array(e.length), o = 0, a = 0, s = [{
                            start: 0,
                            count: 0,
                            index: 0
                        }], h = s[0], l = 0, c = 0, u = new Int32Array(6), f = new Int32Array(r.length), p = new Int32Array(r.length), d = 0; d < r.length; d++) f[d] = -1, p[d] = -1;
                    for (var m = 0; m < i; m++) {
                        c = 0;
                        for (var g = 0; g < 3; g++) {
                            var v = e[3 * m + g];
                            f[v] == -1 ? (u[2 * g] = v, u[2 * g + 1] = -1, c++) : f[v] < h.index ? (u[2 * g] = v, u[2 * g + 1] = -1, l++) : (u[2 * g] = v, u[2 * g + 1] = f[v])
                        }
                        var y = a + c;
                        if (y > h.index + t) {
                            var x = {
                                start: o,
                                count: 0,
                                index: a
                            };
                            s.push(x), h = x;
                            for (var b = 0; b < 6; b += 2) {
                                var _ = u[b + 1];
                                _ > -1 && _ < h.index && (u[b + 1] = -1)
                            }
                        }
                        for (var b = 0; b < 6; b += 2) {
                            var v = u[b],
                                _ = u[b + 1];
                            _ === -1 && (_ = a++), f[v] = _, p[_] = v, n[o++] = _ - h.index, h.count++
                        }
                    }
                    return this.reorderBuffers(n, p, a), this.offsets = s, this.drawcalls = s, s
                },
                merge: function(t, e) {
                    if (t instanceof i.BufferGeometry == !1) return void i.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
                    void 0 === e && (e = 0);
                    var r = this.attributes;
                    for (var n in r)
                        if (void 0 !== t.attributes[n])
                            for (var o = r[n], a = o.array, s = t.attributes[n], h = s.array, l = s.itemSize, c = 0, u = l * e; c < h.length; c++, u++) a[u] = h[c];
                    return this
                },
                normalizeNormals: function() {
                    for (var t, e, r, i, n = this.attributes.normal.array, o = 0, a = n.length; o < a; o += 3) t = n[o], e = n[o + 1], r = n[o + 2], i = 1 / Math.sqrt(t * t + e * e + r * r), n[o] *= i, n[o + 1] *= i, n[o + 2] *= i
                },
                reorderBuffers: function(t, e, r) {
                    var i = {};
                    for (var n in this.attributes)
                        if ("index" != n) {
                            var o = this.attributes[n].array;
                            i[n] = new o.constructor(this.attributes[n].itemSize * r)
                        }
                    for (var a = 0; a < r; a++) {
                        var s = e[a];
                        for (var n in this.attributes)
                            if ("index" != n)
                                for (var h = this.attributes[n].array, l = this.attributes[n].itemSize, c = i[n], u = 0; u < l; u++) c[a * l + u] = h[s * l + u]
                    }
                    this.attributes.index.array = t;
                    for (var n in this.attributes) "index" != n && (this.attributes[n].array = i[n], this.attributes[n].numItems = this.attributes[n].itemSize * r)
                },
                toJSON: function() {
                    var t = {
                            metadata: {
                                version: 4,
                                type: "BufferGeometry",
                                generator: "BufferGeometryExporter"
                            },
                            uuid: this.uuid,
                            type: this.type,
                            data: {
                                attributes: {}
                            }
                        },
                        e = this.attributes,
                        r = this.offsets,
                        i = this.boundingSphere;
                    for (var n in e) {
                        var o = e[n],
                            a = Array.prototype.slice.call(o.array);
                        t.data.attributes[n] = {
                            itemSize: o.itemSize,
                            type: o.array.constructor.name,
                            array: a
                        }
                    }
                    return r.length > 0 && (t.data.offsets = JSON.parse(JSON.stringify(r))), null !== i && (t.data.boundingSphere = {
                        center: i.center.toArray(),
                        radius: i.radius
                    }), t
                },
                clone: function() {
                    var t = new i.BufferGeometry;
                    for (var e in this.attributes) {
                        var r = this.attributes[e];
                        t.addAttribute(e, r.clone())
                    }
                    for (var n = 0, o = this.offsets.length; n < o; n++) {
                        var a = this.offsets[n];
                        t.offsets.push({
                            start: a.start,
                            index: a.index,
                            count: a.count
                        })
                    }
                    return t
                },
                dispose: function() {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, i.EventDispatcher.prototype.apply(i.BufferGeometry.prototype), i.Geometry = function() {
                Object.defineProperty(this, "id", {
                    value: i.GeometryIdCount++
                }), this.uuid = i.Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
                    []
                ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.elementsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
            }, i.Geometry.prototype = {
                constructor: i.Geometry,
                applyMatrix: function(t) {
                    for (var e = (new i.Matrix3).getNormalMatrix(t), r = 0, n = this.vertices.length; r < n; r++) {
                        var o = this.vertices[r];
                        o.applyMatrix4(t)
                    }
                    for (var r = 0, n = this.faces.length; r < n; r++) {
                        var a = this.faces[r];
                        a.normal.applyMatrix3(e).normalize();
                        for (var s = 0, h = a.vertexNormals.length; s < h; s++) a.vertexNormals[s].applyMatrix3(e).normalize()
                    }
                    null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0
                },
                fromBufferGeometry: function(t) {
                    for (var e = this, r = t.attributes, n = r.position.array, o = void 0 !== r.index ? r.index.array : void 0, a = void 0 !== r.normal ? r.normal.array : void 0, s = void 0 !== r.color ? r.color.array : void 0, h = void 0 !== r.uv ? r.uv.array : void 0, l = [], c = [], u = 0, f = 0; u < n.length; u += 3, f += 2) e.vertices.push(new i.Vector3(n[u], n[u + 1], n[u + 2])), void 0 !== a && l.push(new i.Vector3(a[u], a[u + 1], a[u + 2])), void 0 !== s && e.colors.push(new i.Color(s[u], s[u + 1], s[u + 2])), void 0 !== h && c.push(new i.Vector2(h[f], h[f + 1]));
                    var p = function(t, r, n) {
                        var o = void 0 !== a ? [l[t].clone(), l[r].clone(), l[n].clone()] : [],
                            u = void 0 !== s ? [e.colors[t].clone(), e.colors[r].clone(), e.colors[n].clone()] : [];
                        e.faces.push(new i.Face3(t, r, n, o, u)), void 0 !== h && e.faceVertexUvs[0].push([c[t].clone(), c[r].clone(), c[n].clone()])
                    };
                    if (void 0 !== o) {
                        var d = t.drawcalls;
                        if (d.length > 0)
                            for (var u = 0; u < d.length; u++)
                                for (var m = d[u], g = m.start, v = m.count, y = m.index, f = g, x = g + v; f < x; f += 3) p(y + o[f], y + o[f + 1], y + o[f + 2]);
                        else
                            for (var u = 0; u < o.length; u += 3) p(o[u], o[u + 1], o[u + 2])
                    } else
                        for (var u = 0; u < n.length / 3; u += 3) p(u, u + 1, u + 2);
                    return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this
                },
                center: function() {
                    this.computeBoundingBox();
                    var t = this.boundingBox.center().negate();
                    return this.applyMatrix((new i.Matrix4).setPosition(t)), t
                },
                computeFaceNormals: function() {
                    for (var t = new i.Vector3, e = new i.Vector3, r = 0, n = this.faces.length; r < n; r++) {
                        var o = this.faces[r],
                            a = this.vertices[o.a],
                            s = this.vertices[o.b],
                            h = this.vertices[o.c];
                        t.subVectors(h, s), e.subVectors(a, s), t.cross(e), t.normalize(), o.normal.copy(t)
                    }
                },
                computeVertexNormals: function(t) {
                    var e, r, n, o, a, s;
                    for (s = new Array(this.vertices.length), e = 0, r = this.vertices.length; e < r; e++) s[e] = new i.Vector3;
                    if (t) {
                        var h, l, c, u = new i.Vector3,
                            f = new i.Vector3;
                        for (n = 0, o = this.faces.length; n < o; n++) a = this.faces[n], h = this.vertices[a.a], l = this.vertices[a.b], c = this.vertices[a.c], u.subVectors(c, l), f.subVectors(h, l), u.cross(f), s[a.a].add(u), s[a.b].add(u), s[a.c].add(u)
                    } else
                        for (n = 0, o = this.faces.length; n < o; n++) a = this.faces[n], s[a.a].add(a.normal), s[a.b].add(a.normal), s[a.c].add(a.normal);
                    for (e = 0, r = this.vertices.length; e < r; e++) s[e].normalize();
                    for (n = 0, o = this.faces.length; n < o; n++) a = this.faces[n], a.vertexNormals[0] = s[a.a].clone(), a.vertexNormals[1] = s[a.b].clone(), a.vertexNormals[2] = s[a.c].clone()
                },
                computeMorphNormals: function() {
                    var t, e, r, n, o;
                    for (r = 0, n = this.faces.length; r < n; r++)
                        for (o = this.faces[r], o.__originalFaceNormal ? o.__originalFaceNormal.copy(o.normal) : o.__originalFaceNormal = o.normal.clone(), o.__originalVertexNormals || (o.__originalVertexNormals = []), t = 0, e = o.vertexNormals.length; t < e; t++) o.__originalVertexNormals[t] ? o.__originalVertexNormals[t].copy(o.vertexNormals[t]) : o.__originalVertexNormals[t] = o.vertexNormals[t].clone();
                    var a = new i.Geometry;
                    for (a.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
                        if (!this.morphNormals[t]) {
                            this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
                            var s, h, l = this.morphNormals[t].faceNormals,
                                c = this.morphNormals[t].vertexNormals;
                            for (r = 0, n = this.faces.length; r < n; r++) s = new i.Vector3, h = {
                                a: new i.Vector3,
                                b: new i.Vector3,
                                c: new i.Vector3
                            }, l.push(s), c.push(h)
                        }
                        var u = this.morphNormals[t];
                        a.vertices = this.morphTargets[t].vertices, a.computeFaceNormals(), a.computeVertexNormals();
                        var s, h;
                        for (r = 0, n = this.faces.length; r < n; r++) o = this.faces[r], s = u.faceNormals[r], h = u.vertexNormals[r], s.copy(o.normal), h.a.copy(o.vertexNormals[0]), h.b.copy(o.vertexNormals[1]), h.c.copy(o.vertexNormals[2])
                    }
                    for (r = 0, n = this.faces.length; r < n; r++) o = this.faces[r], o.normal = o.__originalFaceNormal, o.vertexNormals = o.__originalVertexNormals
                },
                computeTangents: function() {
                    function t(t, e, r, i, n, o, a) {
                        c = t.vertices[e], u = t.vertices[r], f = t.vertices[i], p = l[n], d = l[o], m = l[a], g = u.x - c.x, v = f.x - c.x, y = u.y - c.y, x = f.y - c.y, b = u.z - c.z, _ = f.z - c.z, w = d.x - p.x, M = m.x - p.x, S = d.y - p.y, T = m.y - p.y, E = 1 / (w * T - M * S), F.set((T * g - S * v) * E, (T * y - S * x) * E, (T * b - S * _) * E), D.set((w * v - M * g) * E, (w * x - M * y) * E, (w * _ - M * b) * E), P[e].add(F), P[r].add(F), P[i].add(F), R[e].add(D), R[r].add(D), R[i].add(D)
                    }
                    var e, r, n, o, a, s, h, l, c, u, f, p, d, m, g, v, y, x, b, _, w, M, S, T, E, C, A, L, P = [],
                        R = [],
                        F = new i.Vector3,
                        D = new i.Vector3,
                        B = new i.Vector3,
                        U = new i.Vector3,
                        V = new i.Vector3;
                    for (n = 0, o = this.vertices.length; n < o; n++) P[n] = new i.Vector3, R[n] = new i.Vector3;
                    for (e = 0, r = this.faces.length; e < r; e++) h = this.faces[e], l = this.faceVertexUvs[0][e], t(this, h.a, h.b, h.c, 0, 1, 2);
                    var O = ["a", "b", "c", "d"];
                    for (e = 0, r = this.faces.length; e < r; e++)
                        for (h = this.faces[e], a = 0; a < Math.min(h.vertexNormals.length, 3); a++) V.copy(h.vertexNormals[a]), s = h[O[a]], C = P[s], B.copy(C), B.sub(V.multiplyScalar(V.dot(C))).normalize(), U.crossVectors(h.vertexNormals[a], C), A = U.dot(R[s]), L = A < 0 ? -1 : 1, h.vertexTangents[a] = new i.Vector4(B.x, B.y, B.z, L);
                    this.hasTangents = !0
                },
                computeLineDistances: function() {
                    for (var t = 0, e = this.vertices, r = 0, i = e.length; r < i; r++) r > 0 && (t += e[r].distanceTo(e[r - 1])), this.lineDistances[r] = t
                },
                computeBoundingBox: function() {
                    null === this.boundingBox && (this.boundingBox = new i.Box3), this.boundingBox.setFromPoints(this.vertices)
                },
                computeBoundingSphere: function() {
                    null === this.boundingSphere && (this.boundingSphere = new i.Sphere), this.boundingSphere.setFromPoints(this.vertices)
                },
                merge: function(t, e, r) {
                    if (t instanceof i.Geometry == !1) return void i.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t);
                    var n, o = this.vertices.length,
                        a = this.vertices,
                        s = t.vertices,
                        h = this.faces,
                        l = t.faces,
                        c = this.faceVertexUvs[0],
                        u = t.faceVertexUvs[0];
                    void 0 === r && (r = 0), void 0 !== e && (n = (new i.Matrix3).getNormalMatrix(e));
                    for (var f = 0, p = s.length; f < p; f++) {
                        var d = s[f],
                            m = d.clone();
                        void 0 !== e && m.applyMatrix4(e), a.push(m)
                    }
                    for (f = 0, p = l.length; f < p; f++) {
                        var g, v, y, x = l[f],
                            b = x.vertexNormals,
                            _ = x.vertexColors;
                        g = new i.Face3(x.a + o, x.b + o, x.c + o), g.normal.copy(x.normal), void 0 !== n && g.normal.applyMatrix3(n).normalize();
                        for (var w = 0, M = b.length; w < M; w++) v = b[w].clone(), void 0 !== n && v.applyMatrix3(n).normalize(), g.vertexNormals.push(v);
                        g.color.copy(x.color);
                        for (var w = 0, M = _.length; w < M; w++) y = _[w], g.vertexColors.push(y.clone());
                        g.materialIndex = x.materialIndex + r, h.push(g)
                    }
                    for (f = 0, p = u.length; f < p; f++) {
                        var S = u[f],
                            T = [];
                        if (void 0 !== S) {
                            for (var w = 0, M = S.length; w < M; w++) T.push(S[w].clone());
                            c.push(T)
                        }
                    }
                },
                mergeMesh: function(t) {
                    return t instanceof i.Mesh == !1 ? void i.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t) : (t.matrixAutoUpdate && t.updateMatrix(), void this.merge(t.geometry, t.matrix))
                },
                mergeVertices: function() {
                    var t, e, r, i, n, o, a, s, h = {},
                        l = [],
                        c = [],
                        u = 4,
                        f = Math.pow(10, u);
                    for (r = 0, i = this.vertices.length; r < i; r++) t = this.vertices[r], e = Math.round(t.x * f) + "_" + Math.round(t.y * f) + "_" + Math.round(t.z * f), void 0 === h[e] ? (h[e] = r, l.push(this.vertices[r]), c[r] = l.length - 1) : c[r] = c[h[e]];
                    var p = [];
                    for (r = 0, i = this.faces.length; r < i; r++) {
                        n = this.faces[r], n.a = c[n.a], n.b = c[n.b], n.c = c[n.c], o = [n.a, n.b, n.c];
                        for (var d = -1, m = 0; m < 3; m++)
                            if (o[m] == o[(m + 1) % 3]) {
                                d = m, p.push(r);
                                break
                            }
                    }
                    for (r = p.length - 1; r >= 0; r--) {
                        var g = p[r];
                        for (this.faces.splice(g, 1), a = 0, s = this.faceVertexUvs.length; a < s; a++) this.faceVertexUvs[a].splice(g, 1)
                    }
                    var v = this.vertices.length - l.length;
                    return this.vertices = l, v
                },
                toJSON: function() {
                    function t(t, e, r) {
                        return r ? t | 1 << e : t & ~(1 << e)
                    }

                    function e(t) {
                        var e = t.x.toString() + t.y.toString() + t.z.toString();
                        return void 0 !== f[e] ? f[e] : (f[e] = u.length / 3, u.push(t.x, t.y, t.z), f[e])
                    }

                    function r(t) {
                        var e = t.r.toString() + t.g.toString() + t.b.toString();
                        return void 0 !== d[e] ? d[e] : (d[e] = p.length, p.push(t.getHex()), d[e])
                    }

                    function i(t) {
                        var e = t.x.toString() + t.y.toString();
                        return void 0 !== g[e] ? g[e] : (g[e] = m.length / 2, m.push(t.x, t.y), g[e])
                    }
                    var n = {
                        metadata: {
                            version: 4,
                            type: "BufferGeometry",
                            generator: "BufferGeometryExporter"
                        },
                        uuid: this.uuid,
                        type: this.type
                    };
                    if ("" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                        var o = this.parameters;
                        for (var a in o) void 0 !== o[a] && (n[a] = o[a]);
                        return n
                    }
                    for (var s = [], h = 0; h < this.vertices.length; h++) {
                        var l = this.vertices[h];
                        s.push(l.x, l.y, l.z)
                    }
                    for (var c = [], u = [], f = {}, p = [], d = {}, m = [], g = {}, h = 0; h < this.faces.length; h++) {
                        var v = this.faces[h],
                            y = !1,
                            x = !1,
                            b = void 0 !== this.faceVertexUvs[0][h],
                            _ = v.normal.length() > 0,
                            w = v.vertexNormals.length > 0,
                            M = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
                            S = v.vertexColors.length > 0,
                            T = 0;
                        if (T = t(T, 0, 0), T = t(T, 1, y), T = t(T, 2, x), T = t(T, 3, b), T = t(T, 4, _), T = t(T, 5, w), T = t(T, 6, M), T = t(T, 7, S), c.push(T), c.push(v.a, v.b, v.c), b) {
                            var E = this.faceVertexUvs[0][h];
                            c.push(i(E[0]), i(E[1]), i(E[2]))
                        }
                        if (_ && c.push(e(v.normal)), w) {
                            var C = v.vertexNormals;
                            c.push(e(C[0]), e(C[1]), e(C[2]))
                        }
                        if (M && c.push(r(v.color)), S) {
                            var A = v.vertexColors;
                            c.push(r(A[0]), r(A[1]), r(A[2]))
                        }
                    }
                    return n.data = {}, n.data.vertices = s, n.data.normals = u, p.length > 0 && (n.data.colors = p), m.length > 0 && (n.data.uvs = [m]), n.data.faces = c, n
                },
                clone: function() {
                    for (var t = new i.Geometry, e = this.vertices, r = 0, n = e.length; r < n; r++) t.vertices.push(e[r].clone());
                    for (var o = this.faces, r = 0, n = o.length; r < n; r++) t.faces.push(o[r].clone());
                    for (var r = 0, n = this.faceVertexUvs.length; r < n; r++) {
                        var a = this.faceVertexUvs[r];
                        void 0 === t.faceVertexUvs[r] && (t.faceVertexUvs[r] = []);
                        for (var s = 0, h = a.length; s < h; s++) {
                            for (var l = a[s], c = [], u = 0, f = l.length; u < f; u++) {
                                var p = l[u];
                                c.push(p.clone())
                            }
                            t.faceVertexUvs[r].push(c)
                        }
                    }
                    return t
                },
                dispose: function() {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, i.EventDispatcher.prototype.apply(i.Geometry.prototype), i.GeometryIdCount = 0, i.Camera = function() {
                i.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new i.Matrix4, this.projectionMatrix = new i.Matrix4
            }, i.Camera.prototype = Object.create(i.Object3D.prototype), i.Camera.prototype.constructor = i.Camera, i.Camera.prototype.getWorldDirection = function() {
                var t = new i.Quaternion;
                return function(e) {
                    var r = e || new i.Vector3;
                    return this.getWorldQuaternion(t), r.set(0, 0, -1).applyQuaternion(t)
                }
            }(), i.Camera.prototype.lookAt = function() {
                var t = new i.Matrix4;
                return function(e) {
                    t.lookAt(this.position, e, this.up), this.quaternion.setFromRotationMatrix(t)
                }
            }(), i.Camera.prototype.clone = function(t) {
                return void 0 === t && (t = new i.Camera), i.Object3D.prototype.clone.call(this, t), t.matrixWorldInverse.copy(this.matrixWorldInverse), t.projectionMatrix.copy(this.projectionMatrix), t
            }, i.CubeCamera = function(t, e, r) {
                i.Object3D.call(this), this.type = "CubeCamera";
                var n = 90,
                    o = 1,
                    a = new i.PerspectiveCamera(n, o, t, e);
                a.up.set(0, -1, 0), a.lookAt(new i.Vector3(1, 0, 0)), this.add(a);
                var s = new i.PerspectiveCamera(n, o, t, e);
                s.up.set(0, -1, 0), s.lookAt(new i.Vector3((-1), 0, 0)), this.add(s);
                var h = new i.PerspectiveCamera(n, o, t, e);
                h.up.set(0, 0, 1), h.lookAt(new i.Vector3(0, 1, 0)), this.add(h);
                var l = new i.PerspectiveCamera(n, o, t, e);
                l.up.set(0, 0, -1), l.lookAt(new i.Vector3(0, (-1), 0)), this.add(l);
                var c = new i.PerspectiveCamera(n, o, t, e);
                c.up.set(0, -1, 0), c.lookAt(new i.Vector3(0, 0, 1)), this.add(c);
                var u = new i.PerspectiveCamera(n, o, t, e);
                u.up.set(0, -1, 0), u.lookAt(new i.Vector3(0, 0, (-1))), this.add(u), this.renderTarget = new i.WebGLRenderTargetCube(r, r, {
                    format: i.RGBFormat,
                    magFilter: i.LinearFilter,
                    minFilter: i.LinearFilter
                }), this.updateCubeMap = function(t, e) {
                    var r = this.renderTarget,
                        i = r.generateMipmaps;
                    r.generateMipmaps = !1, r.activeCubeFace = 0, t.render(e, a, r), r.activeCubeFace = 1, t.render(e, s, r), r.activeCubeFace = 2, t.render(e, h, r), r.activeCubeFace = 3, t.render(e, l, r), r.activeCubeFace = 4, t.render(e, c, r), r.generateMipmaps = i, r.activeCubeFace = 5, t.render(e, u, r)
                }
            }, i.CubeCamera.prototype = Object.create(i.Object3D.prototype), i.CubeCamera.prototype.constructor = i.CubeCamera, i.OrthographicCamera = function(t, e, r, n, o, a) {
                i.Camera.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.left = t, this.right = e, this.top = r, this.bottom = n, this.near = void 0 !== o ? o : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
            }, i.OrthographicCamera.prototype = Object.create(i.Camera.prototype), i.OrthographicCamera.prototype.constructor = i.OrthographicCamera, i.OrthographicCamera.prototype.updateProjectionMatrix = function() {
                var t = (this.right - this.left) / (2 * this.zoom),
                    e = (this.top - this.bottom) / (2 * this.zoom),
                    r = (this.right + this.left) / 2,
                    i = (this.top + this.bottom) / 2;
                this.projectionMatrix.makeOrthographic(r - t, r + t, i + e, i - e, this.near, this.far)
            }, i.OrthographicCamera.prototype.clone = function() {
                var t = new i.OrthographicCamera;
                return i.Camera.prototype.clone.call(this, t), t.zoom = this.zoom, t.left = this.left, t.right = this.right, t.top = this.top, t.bottom = this.bottom, t.near = this.near, t.far = this.far, t.projectionMatrix.copy(this.projectionMatrix), t
            }, i.PerspectiveCamera = function(t, e, r, n) {
                i.Camera.call(this), this.type = "PerspectiveCamera", this.zoom = 1, this.fov = void 0 !== t ? t : 50, this.aspect = void 0 !== e ? e : 1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== n ? n : 2e3, this.updateProjectionMatrix()
            }, i.PerspectiveCamera.prototype = Object.create(i.Camera.prototype), i.PerspectiveCamera.prototype.constructor = i.PerspectiveCamera, i.PerspectiveCamera.prototype.setLens = function(t, e) {
                void 0 === e && (e = 24), this.fov = 2 * i.Math.radToDeg(Math.atan(e / (2 * t))), this.updateProjectionMatrix()
            }, i.PerspectiveCamera.prototype.setViewOffset = function(t, e, r, i, n, o) {
                this.fullWidth = t, this.fullHeight = e, this.x = r, this.y = i, this.width = n, this.height = o, this.updateProjectionMatrix()
            }, i.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
                var t = i.Math.radToDeg(2 * Math.atan(Math.tan(.5 * i.Math.degToRad(this.fov)) / this.zoom));
                if (this.fullWidth) {
                    var e = this.fullWidth / this.fullHeight,
                        r = Math.tan(i.Math.degToRad(.5 * t)) * this.near,
                        n = -r,
                        o = e * n,
                        a = e * r,
                        s = Math.abs(a - o),
                        h = Math.abs(r - n);
                    this.projectionMatrix.makeFrustum(o + this.x * s / this.fullWidth, o + (this.x + this.width) * s / this.fullWidth, r - (this.y + this.height) * h / this.fullHeight, r - this.y * h / this.fullHeight, this.near, this.far)
                } else this.projectionMatrix.makePerspective(t, this.aspect, this.near, this.far)
            }, i.PerspectiveCamera.prototype.clone = function() {
                var t = new i.PerspectiveCamera;
                return i.Camera.prototype.clone.call(this, t), t.zoom = this.zoom, t.fov = this.fov, t.aspect = this.aspect, t.near = this.near, t.far = this.far, t.projectionMatrix.copy(this.projectionMatrix), t
            }, i.Light = function(t) {
                i.Object3D.call(this), this.type = "Light", this.color = new i.Color(t)
            }, i.Light.prototype = Object.create(i.Object3D.prototype), i.Light.prototype.constructor = i.Light, i.Light.prototype.clone = function(t) {
                return void 0 === t && (t = new i.Light), i.Object3D.prototype.clone.call(this, t), t.color.copy(this.color), t
            }, i.AmbientLight = function(t) {
                i.Light.call(this, t), this.type = "AmbientLight"
            }, i.AmbientLight.prototype = Object.create(i.Light.prototype), i.AmbientLight.prototype.constructor = i.AmbientLight, i.AmbientLight.prototype.clone = function() {
                var t = new i.AmbientLight;
                return i.Light.prototype.clone.call(this, t), t
            }, i.AreaLight = function(t, e) {
                i.Light.call(this, t), this.type = "AreaLight", this.normal = new i.Vector3(0, (-1), 0), this.right = new i.Vector3(1, 0, 0), this.intensity = void 0 !== e ? e : 1, this.width = 1, this.height = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
            }, i.AreaLight.prototype = Object.create(i.Light.prototype), i.AreaLight.prototype.constructor = i.AreaLight, i.DirectionalLight = function(t, e) {
                i.Light.call(this, t), this.type = "DirectionalLight", this.position.set(0, 1, 0), this.target = new i.Object3D, this.intensity = void 0 !== e ? e : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new i.Vector3(0, 0, (-1e3)), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
            };
        i.DirectionalLight.prototype = Object.create(i.Light.prototype);
        i.DirectionalLight.prototype.constructor = i.DirectionalLight, i.DirectionalLight.prototype.clone = function() {
            var t = new i.DirectionalLight;
            return i.Light.prototype.clone.call(this, t), t.target = this.target.clone(), t.intensity = this.intensity, t.castShadow = this.castShadow, t.onlyShadow = this.onlyShadow, t.shadowCameraNear = this.shadowCameraNear, t.shadowCameraFar = this.shadowCameraFar, t.shadowCameraLeft = this.shadowCameraLeft, t.shadowCameraRight = this.shadowCameraRight, t.shadowCameraTop = this.shadowCameraTop, t.shadowCameraBottom = this.shadowCameraBottom, t.shadowCameraVisible = this.shadowCameraVisible, t.shadowBias = this.shadowBias, t.shadowDarkness = this.shadowDarkness, t.shadowMapWidth = this.shadowMapWidth, t.shadowMapHeight = this.shadowMapHeight, t.shadowCascade = this.shadowCascade, t.shadowCascadeOffset.copy(this.shadowCascadeOffset), t.shadowCascadeCount = this.shadowCascadeCount, t.shadowCascadeBias = this.shadowCascadeBias.slice(0), t.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), t.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), t.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), t.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), t
        }, i.HemisphereLight = function(t, e, r) {
            i.Light.call(this, t), this.type = "HemisphereLight", this.position.set(0, 100, 0), this.groundColor = new i.Color(e), this.intensity = void 0 !== r ? r : 1
        }, i.HemisphereLight.prototype = Object.create(i.Light.prototype), i.HemisphereLight.prototype.constructor = i.HemisphereLight, i.HemisphereLight.prototype.clone = function() {
            var t = new i.HemisphereLight;
            return i.Light.prototype.clone.call(this, t), t.groundColor.copy(this.groundColor), t.intensity = this.intensity, t
        }, i.PointLight = function(t, e, r, n) {
            i.Light.call(this, t), this.type = "PointLight", this.intensity = void 0 !== e ? e : 1, this.distance = void 0 !== r ? r : 0, this.decay = void 0 !== n ? n : 1
        }, i.PointLight.prototype = Object.create(i.Light.prototype), i.PointLight.prototype.constructor = i.PointLight, i.PointLight.prototype.clone = function() {
            var t = new i.PointLight;
            return i.Light.prototype.clone.call(this, t), t.intensity = this.intensity, t.distance = this.distance, t.decay = this.decay, t
        }, i.SpotLight = function(t, e, r, n, o, a) {
            i.Light.call(this, t), this.type = "SpotLight", this.position.set(0, 1, 0), this.target = new i.Object3D, this.intensity = void 0 !== e ? e : 1, this.distance = void 0 !== r ? r : 0, this.angle = void 0 !== n ? n : Math.PI / 3, this.exponent = void 0 !== o ? o : 10, this.decay = void 0 !== a ? a : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
        }, i.SpotLight.prototype = Object.create(i.Light.prototype), i.SpotLight.prototype.constructor = i.SpotLight, i.SpotLight.prototype.clone = function() {
            var t = new i.SpotLight;
            return i.Light.prototype.clone.call(this, t), t.target = this.target.clone(), t.intensity = this.intensity, t.distance = this.distance, t.angle = this.angle, t.exponent = this.exponent, t.decay = this.decay, t.castShadow = this.castShadow, t.onlyShadow = this.onlyShadow, t.shadowCameraNear = this.shadowCameraNear, t.shadowCameraFar = this.shadowCameraFar, t.shadowCameraFov = this.shadowCameraFov, t.shadowCameraVisible = this.shadowCameraVisible, t.shadowBias = this.shadowBias, t.shadowDarkness = this.shadowDarkness, t.shadowMapWidth = this.shadowMapWidth, t.shadowMapHeight = this.shadowMapHeight, t
        }, i.Cache = {
            files: {},
            add: function(t, e) {
                this.files[t] = e
            },
            get: function(t) {
                return this.files[t]
            },
            remove: function(t) {
                delete this.files[t]
            },
            clear: function() {
                this.files = {}
            }
        }, i.Loader = function(t) {
            this.showStatus = t, this.statusDomElement = t ? i.Loader.prototype.addStatusElement() : null, this.imageLoader = new i.ImageLoader, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
        }, i.Loader.prototype = {
            constructor: i.Loader,
            crossOrigin: void 0,
            addStatusElement: function() {
                var t = document.createElement("div");
                return t.style.position = "absolute", t.style.right = "0px", t.style.top = "0px", t.style.fontSize = "0.8em", t.style.textAlign = "left", t.style.background = "rgba(0,0,0,0.25)", t.style.color = "#fff", t.style.width = "120px", t.style.padding = "0.5em 0.5em 0.5em 0.5em", t.style.zIndex = 1e3, t.innerHTML = "Loading ...", t
            },
            updateProgress: function(t) {
                var e = "Loaded ";
                e += t.total ? (100 * t.loaded / t.total).toFixed(0) + "%" : (t.loaded / 1024).toFixed(2) + " KB", this.statusDomElement.innerHTML = e
            },
            extractUrlBase: function(t) {
                var e = t.split("/");
                return 1 === e.length ? "./" : (e.pop(), e.join("/") + "/")
            },
            initMaterials: function(t, e) {
                for (var r = [], i = 0; i < t.length; ++i) r[i] = this.createMaterial(t[i], e);
                return r
            },
            needsTangents: function(t) {
                for (var e = 0, r = t.length; e < r; e++) {
                    var n = t[e];
                    if (n instanceof i.ShaderMaterial) return !0
                }
                return !1
            },
            createMaterial: function(t, e) {
                function r(t) {
                    var e = Math.log(t) / Math.LN2;
                    return Math.pow(2, Math.round(e))
                }

                function n(t, n, o, s, h, l, c) {
                    var u, f = e + o,
                        p = i.Loader.Handlers.get(f);
                    if (null !== p ? u = p.load(f) : (u = new i.Texture, p = a.imageLoader, p.crossOrigin = a.crossOrigin, p.load(f, function(t) {
                            if (i.Math.isPowerOfTwo(t.width) === !1 || i.Math.isPowerOfTwo(t.height) === !1) {
                                var e = r(t.width),
                                    n = r(t.height),
                                    o = document.createElement("canvas");
                                o.width = e, o.height = n;
                                var a = o.getContext("2d");
                                a.drawImage(t, 0, 0, e, n), u.image = o
                            } else u.image = t;
                            u.needsUpdate = !0
                        })), u.sourceFile = o, s && (u.repeat.set(s[0], s[1]), 1 !== s[0] && (u.wrapS = i.RepeatWrapping), 1 !== s[1] && (u.wrapT = i.RepeatWrapping)), h && u.offset.set(h[0], h[1]), l) {
                        var d = {
                            repeat: i.RepeatWrapping,
                            mirror: i.MirroredRepeatWrapping
                        };
                        void 0 !== d[l[0]] && (u.wrapS = d[l[0]]), void 0 !== d[l[1]] && (u.wrapT = d[l[1]])
                    }
                    c && (u.anisotropy = c), t[n] = u
                }

                function o(t) {
                    return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
                }
                var a = this,
                    s = "MeshLambertMaterial",
                    h = {
                        color: 15658734,
                        opacity: 1,
                        map: null,
                        lightMap: null,
                        normalMap: null,
                        bumpMap: null,
                        wireframe: !1
                    };
                if (t.shading) {
                    var l = t.shading.toLowerCase();
                    "phong" === l ? s = "MeshPhongMaterial" : "basic" === l && (s = "MeshBasicMaterial")
                }
                void 0 !== t.blending && void 0 !== i[t.blending] && (h.blending = i[t.blending]), void 0 !== t.transparent && (h.transparent = t.transparent), void 0 !== t.opacity && t.opacity < 1 && (h.transparent = !0), void 0 !== t.depthTest && (h.depthTest = t.depthTest), void 0 !== t.depthWrite && (h.depthWrite = t.depthWrite), void 0 !== t.visible && (h.visible = t.visible), void 0 !== t.flipSided && (h.side = i.BackSide), void 0 !== t.doubleSided && (h.side = i.DoubleSide), void 0 !== t.wireframe && (h.wireframe = t.wireframe), void 0 !== t.vertexColors && ("face" === t.vertexColors ? h.vertexColors = i.FaceColors : t.vertexColors && (h.vertexColors = i.VertexColors)), t.colorDiffuse ? h.color = o(t.colorDiffuse) : t.DbgColor && (h.color = t.DbgColor), t.colorSpecular && (h.specular = o(t.colorSpecular)), t.colorEmissive && (h.emissive = o(t.colorEmissive)), void 0 !== t.transparency && (console.warn("THREE.Loader: transparency has been renamed to opacity"), t.opacity = t.transparency), void 0 !== t.opacity && (h.opacity = t.opacity), t.specularCoef && (h.shininess = t.specularCoef), t.mapDiffuse && e && n(h, "map", t.mapDiffuse, t.mapDiffuseRepeat, t.mapDiffuseOffset, t.mapDiffuseWrap, t.mapDiffuseAnisotropy), t.mapLight && e && n(h, "lightMap", t.mapLight, t.mapLightRepeat, t.mapLightOffset, t.mapLightWrap, t.mapLightAnisotropy), t.mapBump && e && n(h, "bumpMap", t.mapBump, t.mapBumpRepeat, t.mapBumpOffset, t.mapBumpWrap, t.mapBumpAnisotropy), t.mapNormal && e && n(h, "normalMap", t.mapNormal, t.mapNormalRepeat, t.mapNormalOffset, t.mapNormalWrap, t.mapNormalAnisotropy), t.mapSpecular && e && n(h, "specularMap", t.mapSpecular, t.mapSpecularRepeat, t.mapSpecularOffset, t.mapSpecularWrap, t.mapSpecularAnisotropy), t.mapAlpha && e && n(h, "alphaMap", t.mapAlpha, t.mapAlphaRepeat, t.mapAlphaOffset, t.mapAlphaWrap, t.mapAlphaAnisotropy), t.mapBumpScale && (h.bumpScale = t.mapBumpScale), t.mapNormalFactor && (h.normalScale = new i.Vector2(t.mapNormalFactor, t.mapNormalFactor));
                var c = new i[s](h);
                return void 0 !== t.DbgName && (c.name = t.DbgName), c
            }
        }, i.Loader.Handlers = {
            handlers: [],
            add: function(t, e) {
                this.handlers.push(t, e)
            },
            get: function(t) {
                for (var e = 0, r = this.handlers.length; e < r; e += 2) {
                    var i = this.handlers[e],
                        n = this.handlers[e + 1];
                    if (i.test(t)) return n
                }
                return null
            }
        }, i.XHRLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager
        }, i.XHRLoader.prototype = {
            constructor: i.XHRLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = i.Cache.get(t);
                if (void 0 !== a) return void(e && e(a));
                var s = new XMLHttpRequest;
                s.open("GET", t, !0), s.addEventListener("load", function(r) {
                    i.Cache.add(t, this.response), e && e(this.response), o.manager.itemEnd(t)
                }, !1), void 0 !== r && s.addEventListener("progress", function(t) {
                    r(t)
                }, !1), void 0 !== n && s.addEventListener("error", function(t) {
                    n(t)
                }, !1), void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (s.responseType = this.responseType), s.send(null), o.manager.itemStart(t)
            },
            setResponseType: function(t) {
                this.responseType = t
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            }
        }, i.ImageLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager
        }, i.ImageLoader.prototype = {
            constructor: i.ImageLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = i.Cache.get(t);
                if (void 0 !== a) return void e(a);
                var s = document.createElement("img");
                return s.addEventListener("load", function(r) {
                    i.Cache.add(t, this), e && e(this), o.manager.itemEnd(t)
                }, !1), void 0 !== r && s.addEventListener("progress", function(t) {
                    r(t)
                }, !1), void 0 !== n && s.addEventListener("error", function(t) {
                    n(t)
                }, !1), void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), s.src = t, o.manager.itemStart(t), s
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            }
        }, i.JSONLoader = function(t) {
            i.Loader.call(this, t), this.withCredentials = !1
        }, i.JSONLoader.prototype = Object.create(i.Loader.prototype), i.JSONLoader.prototype.constructor = i.JSONLoader, i.JSONLoader.prototype.load = function(t, e, r) {
            r = r && "string" == typeof r ? r : this.extractUrlBase(t), this.onLoadStart(), this.loadAjaxJSON(this, t, e, r)
        }, i.JSONLoader.prototype.loadAjaxJSON = function(t, e, r, n, o) {
            var a = new XMLHttpRequest,
                s = 0;
            a.onreadystatechange = function() {
                if (a.readyState === a.DONE)
                    if (200 === a.status || 0 === a.status) {
                        if (a.responseText) {
                            var h = JSON.parse(a.responseText),
                                l = h.metadata;
                            if (void 0 !== l) {
                                if ("object" === l.type) return void i.error("THREE.JSONLoader: " + e + " should be loaded with THREE.ObjectLoader instead.");
                                if ("scene" === l.type) return void i.error("THREE.JSONLoader: " + e + " seems to be a Scene. Use THREE.SceneLoader instead.")
                            }
                            var c = t.parse(h, n);
                            r(c.geometry, c.materials)
                        } else i.error("THREE.JSONLoader: " + e + " seems to be unreachable or the file is empty.");
                        t.onLoadComplete()
                    } else i.error("THREE.JSONLoader: Couldn't load " + e + " (" + a.status + ")");
                else a.readyState === a.LOADING ? o && (0 === s && (s = a.getResponseHeader("Content-Length")), o({
                    total: s,
                    loaded: a.responseText.length
                })) : a.readyState === a.HEADERS_RECEIVED && void 0 !== o && (s = a.getResponseHeader("Content-Length"))
            }, a.open("GET", e, !0), a.withCredentials = this.withCredentials, a.send(null)
        }, i.JSONLoader.prototype.parse = function(t, e) {
            function r(e) {
                function r(t, e) {
                    return t & 1 << e
                }
                var n, o, s, h, l, c, u, f, p, d, m, g, v, y, x, b, _, w, M, S, T, E, C, A, L, P, R, F = t.faces,
                    D = t.vertices,
                    B = t.normals,
                    U = t.colors,
                    V = 0;
                if (void 0 !== t.uvs) {
                    for (n = 0; n < t.uvs.length; n++) t.uvs[n].length && V++;
                    for (n = 0; n < V; n++) a.faceVertexUvs[n] = []
                }
                for (h = 0, l = D.length; h < l;) w = new i.Vector3, w.x = D[h++] * e, w.y = D[h++] * e, w.z = D[h++] * e, a.vertices.push(w);
                for (h = 0, l = F.length; h < l;)
                    if (d = F[h++], m = r(d, 0), g = r(d, 1), v = r(d, 3), y = r(d, 4), x = r(d, 5), b = r(d, 6), _ = r(d, 7), m) {
                        if (S = new i.Face3, S.a = F[h], S.b = F[h + 1], S.c = F[h + 3], T = new i.Face3, T.a = F[h + 1], T.b = F[h + 2], T.c = F[h + 3], h += 4, g && (p = F[h++], S.materialIndex = p, T.materialIndex = p), s = a.faces.length, v)
                            for (n = 0; n < V; n++)
                                for (A = t.uvs[n], a.faceVertexUvs[n][s] = [], a.faceVertexUvs[n][s + 1] = [], o = 0; o < 4; o++) f = F[h++], P = A[2 * f], R = A[2 * f + 1], L = new i.Vector2(P, R), 2 !== o && a.faceVertexUvs[n][s].push(L), 0 !== o && a.faceVertexUvs[n][s + 1].push(L);
                        if (y && (u = 3 * F[h++], S.normal.set(B[u++], B[u++], B[u]), T.normal.copy(S.normal)), x)
                            for (n = 0; n < 4; n++) u = 3 * F[h++], C = new i.Vector3(B[u++], B[u++], B[u]), 2 !== n && S.vertexNormals.push(C), 0 !== n && T.vertexNormals.push(C);
                        if (b && (c = F[h++], E = U[c], S.color.setHex(E), T.color.setHex(E)), _)
                            for (n = 0; n < 4; n++) c = F[h++], E = U[c], 2 !== n && S.vertexColors.push(new i.Color(E)), 0 !== n && T.vertexColors.push(new i.Color(E));
                        a.faces.push(S), a.faces.push(T)
                    } else {
                        if (M = new i.Face3, M.a = F[h++], M.b = F[h++], M.c = F[h++], g && (p = F[h++], M.materialIndex = p), s = a.faces.length, v)
                            for (n = 0; n < V; n++)
                                for (A = t.uvs[n], a.faceVertexUvs[n][s] = [], o = 0; o < 3; o++) f = F[h++], P = A[2 * f], R = A[2 * f + 1], L = new i.Vector2(P, R), a.faceVertexUvs[n][s].push(L);
                        if (y && (u = 3 * F[h++], M.normal.set(B[u++], B[u++], B[u])), x)
                            for (n = 0; n < 3; n++) u = 3 * F[h++], C = new i.Vector3(B[u++], B[u++], B[u]), M.vertexNormals.push(C);
                        if (b && (c = F[h++], M.color.setHex(U[c])), _)
                            for (n = 0; n < 3; n++) c = F[h++], M.vertexColors.push(new i.Color(U[c]));
                        a.faces.push(M)
                    }
            }

            function n() {
                var e = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
                if (t.skinWeights)
                    for (var r = 0, n = t.skinWeights.length; r < n; r += e) {
                        var o = t.skinWeights[r],
                            s = e > 1 ? t.skinWeights[r + 1] : 0,
                            h = e > 2 ? t.skinWeights[r + 2] : 0,
                            l = e > 3 ? t.skinWeights[r + 3] : 0;
                        a.skinWeights.push(new i.Vector4(o, s, h, l))
                    }
                if (t.skinIndices)
                    for (var r = 0, n = t.skinIndices.length; r < n; r += e) {
                        var c = t.skinIndices[r],
                            u = e > 1 ? t.skinIndices[r + 1] : 0,
                            f = e > 2 ? t.skinIndices[r + 2] : 0,
                            p = e > 3 ? t.skinIndices[r + 3] : 0;
                        a.skinIndices.push(new i.Vector4(c, u, f, p))
                    }
                a.bones = t.bones, a.bones && a.bones.length > 0 && (a.skinWeights.length !== a.skinIndices.length || a.skinIndices.length !== a.vertices.length) && i.warn("THREE.JSONLoader: When skinning, number of vertices (" + a.vertices.length + "), skinIndices (" + a.skinIndices.length + "), and skinWeights (" + a.skinWeights.length + ") should match."), a.animation = t.animation, a.animations = t.animations
            }

            function o(e) {
                if (void 0 !== t.morphTargets) {
                    var r, n, o, s, h, l;
                    for (r = 0, n = t.morphTargets.length; r < n; r++)
                        for (a.morphTargets[r] = {}, a.morphTargets[r].name = t.morphTargets[r].name, a.morphTargets[r].vertices = [], h = a.morphTargets[r].vertices, l = t.morphTargets[r].vertices, o = 0, s = l.length; o < s; o += 3) {
                            var c = new i.Vector3;
                            c.x = l[o] * e, c.y = l[o + 1] * e, c.z = l[o + 2] * e, h.push(c)
                        }
                }
                if (void 0 !== t.morphColors) {
                    var r, n, u, f, p, d, m;
                    for (r = 0, n = t.morphColors.length; r < n; r++)
                        for (a.morphColors[r] = {}, a.morphColors[r].name = t.morphColors[r].name, a.morphColors[r].colors = [], p = a.morphColors[r].colors, d = t.morphColors[r].colors, u = 0, f = d.length; u < f; u += 3) m = new i.Color(16755200), m.setRGB(d[u], d[u + 1], d[u + 2]), p.push(m)
                }
            }
            var a = new i.Geometry,
                s = void 0 !== t.scale ? 1 / t.scale : 1;
            if (r(s), n(), o(s), a.computeFaceNormals(), a.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length) return {
                geometry: a
            };
            var h = this.initMaterials(t.materials, e);
            return this.needsTangents(h) && a.computeTangents(), {
                geometry: a,
                materials: h
            }
        }, i.LoadingManager = function(t, e, r) {
            var i = this,
                n = 0,
                o = 0;
            this.onLoad = t, this.onProgress = e, this.onError = r, this.itemStart = function(t) {
                o++
            }, this.itemEnd = function(t) {
                n++, void 0 !== i.onProgress && i.onProgress(t, n, o), n === o && void 0 !== i.onLoad && i.onLoad()
            }
        }, i.DefaultLoadingManager = new i.LoadingManager, i.BufferGeometryLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager
        }, i.BufferGeometryLoader.prototype = {
            constructor: i.BufferGeometryLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = new i.XHRLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(t, function(t) {
                    e(o.parse(JSON.parse(t)))
                }, r, n)
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            },
            parse: function(t) {
                var e = new i.BufferGeometry,
                    r = t.data.attributes;
                for (var n in r) {
                    var o = r[n],
                        a = new self[o.type](o.array);
                    e.addAttribute(n, new i.BufferAttribute(a, o.itemSize))
                }
                var s = t.data.offsets;
                void 0 !== s && (e.offsets = JSON.parse(JSON.stringify(s)));
                var h = t.data.boundingSphere;
                if (void 0 !== h) {
                    var l = new i.Vector3;
                    void 0 !== h.center && l.fromArray(h.center), e.boundingSphere = new i.Sphere(l, h.radius)
                }
                return e
            }
        }, i.MaterialLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager
        }, i.MaterialLoader.prototype = {
            constructor: i.MaterialLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = new i.XHRLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(t, function(t) {
                    e(o.parse(JSON.parse(t)))
                }, r, n)
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            },
            parse: function(t) {
                var e = new i[t.type];
                if (void 0 !== t.color && e.color.setHex(t.color), void 0 !== t.emissive && e.emissive.setHex(t.emissive), void 0 !== t.specular && e.specular.setHex(t.specular), void 0 !== t.shininess && (e.shininess = t.shininess), void 0 !== t.uniforms && (e.uniforms = t.uniforms), void 0 !== t.vertexShader && (e.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (e.fragmentShader = t.fragmentShader), void 0 !== t.vertexColors && (e.vertexColors = t.vertexColors), void 0 !== t.shading && (e.shading = t.shading), void 0 !== t.blending && (e.blending = t.blending), void 0 !== t.side && (e.side = t.side), void 0 !== t.opacity && (e.opacity = t.opacity), void 0 !== t.transparent && (e.transparent = t.transparent), void 0 !== t.wireframe && (e.wireframe = t.wireframe), void 0 !== t.size && (e.size = t.size), void 0 !== t.sizeAttenuation && (e.sizeAttenuation = t.sizeAttenuation), void 0 !== t.materials)
                    for (var r = 0, n = t.materials.length; r < n; r++) e.materials.push(this.parse(t.materials[r]));
                return e
            }
        }, i.ObjectLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager, this.texturePath = ""
        }, i.ObjectLoader.prototype = {
            constructor: i.ObjectLoader,
            load: function(t, e, r, n) {
                "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
                var o = this,
                    a = new i.XHRLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(t, function(t) {
                    o.parse(JSON.parse(t), e)
                }, r, n)
            },
            setTexturePath: function(t) {
                this.texturePath = t
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            },
            parse: function(t, e) {
                var r = this.parseGeometries(t.geometries),
                    i = this.parseImages(t.images, function() {
                        void 0 !== e && e(a)
                    }),
                    n = this.parseTextures(t.textures, i),
                    o = this.parseMaterials(t.materials, n),
                    a = this.parseObject(t.object, r, o);
                return void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(a), a
            },
            parseGeometries: function(t) {
                var e = {};
                if (void 0 !== t)
                    for (var r = new i.JSONLoader, n = new i.BufferGeometryLoader, o = 0, a = t.length; o < a; o++) {
                        var s, h = t[o];
                        switch (h.type) {
                            case "PlaneGeometry":
                            case "PlaneBufferGeometry":
                                s = new i[h.type](h.width, h.height, h.widthSegments, h.heightSegments);
                                break;
                            case "BoxGeometry":
                            case "CubeGeometry":
                                s = new i.BoxGeometry(h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                                break;
                            case "CircleGeometry":
                                s = new i.CircleGeometry(h.radius, h.segments);
                                break;
                            case "CylinderGeometry":
                                s = new i.CylinderGeometry(h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded);
                                break;
                            case "SphereGeometry":
                                s = new i.SphereGeometry(h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                                break;
                            case "IcosahedronGeometry":
                                s = new i.IcosahedronGeometry(h.radius, h.detail);
                                break;
                            case "TorusGeometry":
                                s = new i.TorusGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                                break;
                            case "TorusKnotGeometry":
                                s = new i.TorusKnotGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.p, h.q, h.heightScale);
                                break;
                            case "BufferGeometry":
                                s = n.parse(h);
                                break;
                            case "Geometry":
                                s = r.parse(h.data).geometry
                        }
                        s.uuid = h.uuid, void 0 !== h.name && (s.name = h.name), e[h.uuid] = s
                    }
                return e
            },
            parseMaterials: function(t, e) {
                var r = {};
                if (void 0 !== t)
                    for (var n = function(t) {
                            return void 0 === e[t] && i.warn("THREE.ObjectLoader: Undefined texture", t), e[t]
                        }, o = new i.MaterialLoader, a = 0, s = t.length; a < s; a++) {
                        var h = t[a],
                            l = o.parse(h);
                        l.uuid = h.uuid, void 0 !== h.name && (l.name = h.name), void 0 !== h.map && (l.map = n(h.map)), void 0 !== h.bumpMap && (l.bumpMap = n(h.bumpMap), h.bumpScale && (l.bumpScale = new i.Vector2(h.bumpScale, h.bumpScale))), void 0 !== h.alphaMap && (l.alphaMap = n(h.alphaMap)), void 0 !== h.envMap && (l.envMap = n(h.envMap)), void 0 !== h.normalMap && (l.normalMap = n(h.normalMap), h.normalScale && (l.normalScale = new i.Vector2(h.normalScale, h.normalScale))), void 0 !== h.lightMap && (l.lightMap = n(h.lightMap)), void 0 !== h.specularMap && (l.specularMap = n(h.specularMap)), r[h.uuid] = l
                    }
                return r
            },
            parseImages: function(t, e) {
                var r = this,
                    n = {};
                if (void 0 !== t && t.length > 0) {
                    var o = new i.LoadingManager(e),
                        a = new i.ImageLoader(o);
                    a.setCrossOrigin(this.crossOrigin);
                    for (var s = function(t) {
                            return r.manager.itemStart(t), a.load(t, function() {
                                r.manager.itemEnd(t)
                            })
                        }, h = 0, l = t.length; h < l; h++) {
                        var c = t[h],
                            u = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : r.texturePath + c.url;
                        n[c.uuid] = s(u)
                    }
                }
                return n
            },
            parseTextures: function(t, e) {
                var r = {};
                if (void 0 !== t)
                    for (var n = 0, o = t.length; n < o; n++) {
                        var a = t[n];
                        void 0 === a.image && i.warn('THREE.ObjectLoader: No "image" speficied for', a.uuid), void 0 === e[a.image] && i.warn("THREE.ObjectLoader: Undefined image", a.image);
                        var s = new i.Texture(e[a.image]);
                        s.needsUpdate = !0, s.uuid = a.uuid, void 0 !== a.name && (s.name = a.name), void 0 !== a.repeat && (s.repeat = new i.Vector2(a.repeat[0], a.repeat[1])), void 0 !== a.minFilter && (s.minFilter = i[a.minFilter]), void 0 !== a.magFilter && (s.magFilter = i[a.magFilter]), void 0 !== a.anisotropy && (s.anisotropy = a.anisotropy), a.wrap instanceof Array && (s.wrapS = i[a.wrap[0]], s.wrapT = i[a.wrap[1]]), r[a.uuid] = s
                    }
                return r
            },
            parseObject: function() {
                var t = new i.Matrix4;
                return function(e, r, n) {
                    var o, a = function(t) {
                            return void 0 === r[t] && i.warn("THREE.ObjectLoader: Undefined geometry", t), r[t]
                        },
                        s = function(t) {
                            return void 0 === n[t] && i.warn("THREE.ObjectLoader: Undefined material", t), n[t]
                        };
                    switch (e.type) {
                        case "Scene":
                            o = new i.Scene;
                            break;
                        case "PerspectiveCamera":
                            o = new i.PerspectiveCamera(e.fov, e.aspect, e.near, e.far);
                            break;
                        case "OrthographicCamera":
                            o = new i.OrthographicCamera(e.left, e.right, e.top, e.bottom, e.near, e.far);
                            break;
                        case "AmbientLight":
                            o = new i.AmbientLight(e.color);
                            break;
                        case "DirectionalLight":
                            o = new i.DirectionalLight(e.color, e.intensity);
                            break;
                        case "PointLight":
                            o = new i.PointLight(e.color, e.intensity, e.distance, e.decay);
                            break;
                        case "SpotLight":
                            o = new i.SpotLight(e.color, e.intensity, e.distance, e.angle, e.exponent, e.decay);
                            break;
                        case "HemisphereLight":
                            o = new i.HemisphereLight(e.color, e.groundColor, e.intensity);
                            break;
                        case "Mesh":
                            o = new i.Mesh(a(e.geometry), s(e.material));
                            break;
                        case "Line":
                            o = new i.Line(a(e.geometry), s(e.material), e.mode);
                            break;
                        case "PointCloud":
                            o = new i.PointCloud(a(e.geometry), s(e.material));
                            break;
                        case "Sprite":
                            o = new i.Sprite(s(e.material));
                            break;
                        case "Group":
                            o = new i.Group;
                            break;
                        default:
                            o = new i.Object3D
                    }
                    if (o.uuid = e.uuid, void 0 !== e.name && (o.name = e.name), void 0 !== e.matrix ? (t.fromArray(e.matrix), t.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== e.position && o.position.fromArray(e.position), void 0 !== e.rotation && o.rotation.fromArray(e.rotation), void 0 !== e.scale && o.scale.fromArray(e.scale)), void 0 !== e.visible && (o.visible = e.visible), void 0 !== e.userData && (o.userData = e.userData), void 0 !== e.children)
                        for (var h in e.children) o.add(this.parseObject(e.children[h], r, n));
                    return o
                }
            }()
        }, i.TextureLoader = function(t) {
            this.manager = void 0 !== t ? t : i.DefaultLoadingManager
        }, i.TextureLoader.prototype = {
            constructor: i.TextureLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = new i.ImageLoader(o.manager);
                a.setCrossOrigin(this.crossOrigin), a.load(t, function(t) {
                    var r = new i.Texture(t);
                    r.needsUpdate = !0, void 0 !== e && e(r)
                }, r, n)
            },
            setCrossOrigin: function(t) {
                this.crossOrigin = t
            }
        }, i.DataTextureLoader = i.BinaryTextureLoader = function() {
            this._parser = null
        }, i.BinaryTextureLoader.prototype = {
            constructor: i.BinaryTextureLoader,
            load: function(t, e, r, n) {
                var o = this,
                    a = new i.DataTexture,
                    s = new i.XHRLoader;
                return s.setResponseType("arraybuffer"), s.load(t, function(t) {
                    var r = o._parser(t);
                    r && (void 0 !== r.image ? a.image = r.image : void 0 !== r.data && (a.image.width = r.width, a.image.height = r.height, a.image.data = r.data), a.wrapS = void 0 !== r.wrapS ? r.wrapS : i.ClampToEdgeWrapping, a.wrapT = void 0 !== r.wrapT ? r.wrapT : i.ClampToEdgeWrapping, a.magFilter = void 0 !== r.magFilter ? r.magFilter : i.LinearFilter, a.minFilter = void 0 !== r.minFilter ? r.minFilter : i.LinearMipMapLinearFilter, a.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, void 0 !== r.format && (a.format = r.format), void 0 !== r.type && (a.type = r.type), void 0 !== r.mipmaps && (a.mipmaps = r.mipmaps), 1 === r.mipmapCount && (a.minFilter = i.LinearFilter), a.needsUpdate = !0, e && e(a, r))
                }, r, n), a
            }
        }, i.CompressedTextureLoader = function() {
            this._parser = null
        }, i.CompressedTextureLoader.prototype = {
            constructor: i.CompressedTextureLoader,
            load: function(t, e, r) {
                var n = this,
                    o = [],
                    a = new i.CompressedTexture;
                a.image = o;
                var s = new i.XHRLoader;
                if (s.setResponseType("arraybuffer"), t instanceof Array)
                    for (var h = 0, l = function(r) {
                            s.load(t[r], function(t) {
                                var s = n._parser(t, !0);
                                o[r] = {
                                    width: s.width,
                                    height: s.height,
                                    format: s.format,
                                    mipmaps: s.mipmaps
                                }, h += 1, 6 === h && (1 == s.mipmapCount && (a.minFilter = i.LinearFilter), a.format = s.format, a.needsUpdate = !0, e && e(a))
                            })
                        }, c = 0, u = t.length; c < u; ++c) l(c);
                else s.load(t, function(t) {
                    var r = n._parser(t, !0);
                    if (r.isCubemap)
                        for (var s = r.mipmaps.length / r.mipmapCount, h = 0; h < s; h++) {
                            o[h] = {
                                mipmaps: []
                            };
                            for (var l = 0; l < r.mipmapCount; l++) o[h].mipmaps.push(r.mipmaps[h * r.mipmapCount + l]), o[h].format = r.format, o[h].width = r.width, o[h].height = r.height
                        } else a.image.width = r.width, a.image.height = r.height, a.mipmaps = r.mipmaps;
                    1 === r.mipmapCount && (a.minFilter = i.LinearFilter), a.format = r.format, a.needsUpdate = !0, e && e(a)
                });
                return a
            }
        }, i.Material = function() {
            Object.defineProperty(this, "id", {
                value: i.MaterialIdCount++
            }), this.uuid = i.Math.generateUUID(), this.name = "", this.type = "Material", this.side = i.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = i.NormalBlending, this.blendSrc = i.SrcAlphaFactor, this.blendDst = i.OneMinusSrcAlphaFactor, this.blendEquation = i.AddEquation, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthTest = !0, this.depthWrite = !0, this.colorWrite = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.overdraw = 0, this.visible = !0, this._needsUpdate = !0
        }, i.Material.prototype = {
            constructor: i.Material,
            get needsUpdate() {
                return this._needsUpdate
            },
            set needsUpdate(t) {
                t === !0 && this.update(), this._needsUpdate = t
            },
            setValues: function(t) {
                if (void 0 !== t)
                    for (var e in t) {
                        var r = t[e];
                        if (void 0 !== r) {
                            if (e in this) {
                                var n = this[e];
                                n instanceof i.Color ? n.set(r) : n instanceof i.Vector3 && r instanceof i.Vector3 ? n.copy(r) : "overdraw" == e ? this[e] = Number(r) : this[e] = r
                            }
                        } else i.warn("THREE.Material: '" + e + "' parameter is undefined.")
                    }
            },
            toJSON: function() {
                var t = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type
                };
                return "" !== this.name && (t.name = this.name), this instanceof i.MeshBasicMaterial ? (t.color = this.color.getHex(), this.vertexColors !== i.NoColors && (t.vertexColors = this.vertexColors), this.blending !== i.NormalBlending && (t.blending = this.blending), this.side !== i.FrontSide && (t.side = this.side)) : this instanceof i.MeshLambertMaterial ? (t.color = this.color.getHex(), t.emissive = this.emissive.getHex(), this.vertexColors !== i.NoColors && (t.vertexColors = this.vertexColors), this.shading !== i.SmoothShading && (t.shading = this.shading), this.blending !== i.NormalBlending && (t.blending = this.blending), this.side !== i.FrontSide && (t.side = this.side)) : this instanceof i.MeshPhongMaterial ? (t.color = this.color.getHex(), t.emissive = this.emissive.getHex(), t.specular = this.specular.getHex(), t.shininess = this.shininess, this.vertexColors !== i.NoColors && (t.vertexColors = this.vertexColors), this.shading !== i.SmoothShading && (t.shading = this.shading), this.blending !== i.NormalBlending && (t.blending = this.blending), this.side !== i.FrontSide && (t.side = this.side)) : this instanceof i.MeshNormalMaterial ? (this.blending !== i.NormalBlending && (t.blending = this.blending), this.side !== i.FrontSide && (t.side = this.side)) : this instanceof i.MeshDepthMaterial ? (this.blending !== i.NormalBlending && (t.blending = this.blending), this.side !== i.FrontSide && (t.side = this.side)) : this instanceof i.PointCloudMaterial ? (t.size = this.size, t.sizeAttenuation = this.sizeAttenuation, t.color = this.color.getHex(), this.vertexColors !== i.NoColors && (t.vertexColors = this.vertexColors), this.blending !== i.NormalBlending && (t.blending = this.blending)) : this instanceof i.ShaderMaterial ? (t.uniforms = this.uniforms, t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader) : this instanceof i.SpriteMaterial && (t.color = this.color.getHex()), this.opacity < 1 && (t.opacity = this.opacity), this.transparent !== !1 && (t.transparent = this.transparent), this.wireframe !== !1 && (t.wireframe = this.wireframe), t
            },
            clone: function(t) {
                return void 0 === t && (t = new i.Material), t.name = this.name, t.side = this.side, t.opacity = this.opacity, t.transparent = this.transparent, t.blending = this.blending, t.blendSrc = this.blendSrc, t.blendDst = this.blendDst, t.blendEquation = this.blendEquation, t.blendSrcAlpha = this.blendSrcAlpha, t.blendDstAlpha = this.blendDstAlpha, t.blendEquationAlpha = this.blendEquationAlpha, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.polygonOffset = this.polygonOffset, t.polygonOffsetFactor = this.polygonOffsetFactor, t.polygonOffsetUnits = this.polygonOffsetUnits, t.alphaTest = this.alphaTest, t.overdraw = this.overdraw, t.visible = this.visible, t
            },
            update: function() {
                this.dispatchEvent({
                    type: "update"
                })
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, i.EventDispatcher.prototype.apply(i.Material.prototype), i.MaterialIdCount = 0, i.LineBasicMaterial = function(t) {
            i.Material.call(this), this.type = "LineBasicMaterial", this.color = new i.Color(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.vertexColors = i.NoColors, this.fog = !0, this.setValues(t)
        }, i.LineBasicMaterial.prototype = Object.create(i.Material.prototype), i.LineBasicMaterial.prototype.constructor = i.LineBasicMaterial, i.LineBasicMaterial.prototype.clone = function() {
            var t = new i.LineBasicMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.linewidth = this.linewidth, t.linecap = this.linecap, t.linejoin = this.linejoin, t.vertexColors = this.vertexColors, t.fog = this.fog, t
        }, i.LineDashedMaterial = function(t) {
            i.Material.call(this), this.type = "LineDashedMaterial", this.color = new i.Color(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(t)
        }, i.LineDashedMaterial.prototype = Object.create(i.Material.prototype), i.LineDashedMaterial.prototype.constructor = i.LineDashedMaterial, i.LineDashedMaterial.prototype.clone = function() {
            var t = new i.LineDashedMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.linewidth = this.linewidth, t.scale = this.scale, t.dashSize = this.dashSize, t.gapSize = this.gapSize, t.vertexColors = this.vertexColors, t.fog = this.fog, t
        }, i.MeshBasicMaterial = function(t) {
            i.Material.call(this), this.type = "MeshBasicMaterial", this.color = new i.Color(16777215), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = i.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = i.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = i.NoColors, this.skinning = !1, this.morphTargets = !1, this.setValues(t)
        }, i.MeshBasicMaterial.prototype = Object.create(i.Material.prototype), i.MeshBasicMaterial.prototype.constructor = i.MeshBasicMaterial, i.MeshBasicMaterial.prototype.clone = function() {
            var t = new i.MeshBasicMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.map = this.map, t.lightMap = this.lightMap, t.specularMap = this.specularMap, t.alphaMap = this.alphaMap, t.envMap = this.envMap, t.combine = this.combine, t.reflectivity = this.reflectivity, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t
        }, i.MeshLambertMaterial = function(t) {
            i.Material.call(this), this.type = "MeshLambertMaterial", this.color = new i.Color(16777215), this.emissive = new i.Color(0), this.wrapAround = !1, this.wrapRGB = new i.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = i.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = i.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = i.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
        }, i.MeshLambertMaterial.prototype = Object.create(i.Material.prototype), i.MeshLambertMaterial.prototype.constructor = i.MeshLambertMaterial, i.MeshLambertMaterial.prototype.clone = function() {
            var t = new i.MeshLambertMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.emissive.copy(this.emissive), t.wrapAround = this.wrapAround, t.wrapRGB.copy(this.wrapRGB), t.map = this.map, t.lightMap = this.lightMap, t.specularMap = this.specularMap, t.alphaMap = this.alphaMap, t.envMap = this.envMap, t.combine = this.combine, t.reflectivity = this.reflectivity, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
        }, i.MeshPhongMaterial = function(t) {
            i.Material.call(this), this.type = "MeshPhongMaterial", this.color = new i.Color(16777215), this.emissive = new i.Color(0), this.specular = new i.Color(1118481), this.shininess = 30, this.metal = !1, this.wrapAround = !1, this.wrapRGB = new i.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new i.Vector2(1, 1), this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = i.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = i.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = i.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
        }, i.MeshPhongMaterial.prototype = Object.create(i.Material.prototype), i.MeshPhongMaterial.prototype.constructor = i.MeshPhongMaterial, i.MeshPhongMaterial.prototype.clone = function() {
            var t = new i.MeshPhongMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.emissive.copy(this.emissive), t.specular.copy(this.specular), t.shininess = this.shininess, t.metal = this.metal, t.wrapAround = this.wrapAround, t.wrapRGB.copy(this.wrapRGB), t.map = this.map, t.lightMap = this.lightMap, t.bumpMap = this.bumpMap, t.bumpScale = this.bumpScale, t.normalMap = this.normalMap, t.normalScale.copy(this.normalScale), t.specularMap = this.specularMap, t.alphaMap = this.alphaMap, t.envMap = this.envMap, t.combine = this.combine, t.reflectivity = this.reflectivity, t.refractionRatio = this.refractionRatio, t.fog = this.fog, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.wireframeLinecap = this.wireframeLinecap, t.wireframeLinejoin = this.wireframeLinejoin, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
        }, i.MeshDepthMaterial = function(t) {
            i.Material.call(this), this.type = "MeshDepthMaterial", this.morphTargets = !1, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t)
        }, i.MeshDepthMaterial.prototype = Object.create(i.Material.prototype), i.MeshDepthMaterial.prototype.constructor = i.MeshDepthMaterial, i.MeshDepthMaterial.prototype.clone = function() {
            var t = new i.MeshDepthMaterial;
            return i.Material.prototype.clone.call(this, t), t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t
        }, i.MeshNormalMaterial = function(t) {
            i.Material.call(this, t), this.type = "MeshNormalMaterial", this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(t)
        }, i.MeshNormalMaterial.prototype = Object.create(i.Material.prototype), i.MeshNormalMaterial.prototype.constructor = i.MeshNormalMaterial, i.MeshNormalMaterial.prototype.clone = function() {
            var t = new i.MeshNormalMaterial;
            return i.Material.prototype.clone.call(this, t), t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t
        }, i.MeshFaceMaterial = function(t) {
            this.uuid = i.Math.generateUUID(), this.type = "MeshFaceMaterial", this.materials = t instanceof Array ? t : []
        }, i.MeshFaceMaterial.prototype = {
            constructor: i.MeshFaceMaterial,
            toJSON: function() {
                for (var t = {
                        metadata: {
                            version: 4.2,
                            type: "material",
                            generator: "MaterialExporter"
                        },
                        uuid: this.uuid,
                        type: this.type,
                        materials: []
                    }, e = 0, r = this.materials.length; e < r; e++) t.materials.push(this.materials[e].toJSON());
                return t
            },
            clone: function() {
                for (var t = new i.MeshFaceMaterial, e = 0; e < this.materials.length; e++) t.materials.push(this.materials[e].clone());
                return t
            }
        }, i.PointCloudMaterial = function(t) {
            i.Material.call(this), this.type = "PointCloudMaterial", this.color = new i.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = i.NoColors, this.fog = !0, this.setValues(t)
        }, i.PointCloudMaterial.prototype = Object.create(i.Material.prototype), i.PointCloudMaterial.prototype.constructor = i.PointCloudMaterial, i.PointCloudMaterial.prototype.clone = function() {
            var t = new i.PointCloudMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.map = this.map, t.size = this.size, t.sizeAttenuation = this.sizeAttenuation, t.vertexColors = this.vertexColors, t.fog = this.fog, t
        }, i.ParticleBasicMaterial = function(t) {
            return i.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new i.PointCloudMaterial(t)
        }, i.ParticleSystemMaterial = function(t) {
            return i.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new i.PointCloudMaterial(t)
        }, i.ShaderMaterial = function(t) {
            i.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.attributes = null, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.shading = i.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.vertexColors = i.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            }, this.index0AttributeName = void 0, this.setValues(t)
        }, i.ShaderMaterial.prototype = Object.create(i.Material.prototype), i.ShaderMaterial.prototype.constructor = i.ShaderMaterial, i.ShaderMaterial.prototype.clone = function() {
            var t = new i.ShaderMaterial;
            return i.Material.prototype.clone.call(this, t), t.fragmentShader = this.fragmentShader, t.vertexShader = this.vertexShader, t.uniforms = i.UniformsUtils.clone(this.uniforms), t.attributes = this.attributes, t.defines = this.defines, t.shading = this.shading, t.wireframe = this.wireframe, t.wireframeLinewidth = this.wireframeLinewidth, t.fog = this.fog, t.lights = this.lights, t.vertexColors = this.vertexColors, t.skinning = this.skinning, t.morphTargets = this.morphTargets, t.morphNormals = this.morphNormals, t
        }, i.RawShaderMaterial = function(t) {
            i.ShaderMaterial.call(this, t), this.type = "RawShaderMaterial"
        }, i.RawShaderMaterial.prototype = Object.create(i.ShaderMaterial.prototype), i.RawShaderMaterial.prototype.constructor = i.RawShaderMaterial, i.RawShaderMaterial.prototype.clone = function() {
            var t = new i.RawShaderMaterial;
            return i.ShaderMaterial.prototype.clone.call(this, t), t
        }, i.SpriteMaterial = function(t) {
            i.Material.call(this), this.type = "SpriteMaterial", this.color = new i.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(t)
        }, i.SpriteMaterial.prototype = Object.create(i.Material.prototype), i.SpriteMaterial.prototype.constructor = i.SpriteMaterial, i.SpriteMaterial.prototype.clone = function() {
            var t = new i.SpriteMaterial;
            return i.Material.prototype.clone.call(this, t), t.color.copy(this.color), t.map = this.map, t.rotation = this.rotation, t.fog = this.fog, t
        }, i.Texture = function(t, e, r, n, o, a, s, h, l) {
            Object.defineProperty(this, "id", {
                value: i.TextureIdCount++
            }), this.uuid = i.Math.generateUUID(), this.name = "", this.sourceFile = "", this.image = void 0 !== t ? t : i.Texture.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== e ? e : i.Texture.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : i.ClampToEdgeWrapping, this.wrapT = void 0 !== n ? n : i.ClampToEdgeWrapping, this.magFilter = void 0 !== o ? o : i.LinearFilter, this.minFilter = void 0 !== a ? a : i.LinearMipMapLinearFilter, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== s ? s : i.RGBAFormat, this.type = void 0 !== h ? h : i.UnsignedByteType, this.offset = new i.Vector2(0, 0), this.repeat = new i.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
        }, i.Texture.DEFAULT_IMAGE = void 0, i.Texture.DEFAULT_MAPPING = i.UVMapping, i.Texture.prototype = {
            constructor: i.Texture,
            get needsUpdate() {
                return this._needsUpdate
            },
            set needsUpdate(t) {
                t === !0 && this.update(), this._needsUpdate = t
            },
            clone: function(t) {
                return void 0 === t && (t = new i.Texture), t.image = this.image, t.mipmaps = this.mipmaps.slice(0), t.mapping = this.mapping, t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.anisotropy = this.anisotropy, t.format = this.format, t.type = this.type, t.offset.copy(this.offset), t.repeat.copy(this.repeat), t.generateMipmaps = this.generateMipmaps,
                    t.premultiplyAlpha = this.premultiplyAlpha, t.flipY = this.flipY, t.unpackAlignment = this.unpackAlignment, t
            },
            update: function() {
                this.dispatchEvent({
                    type: "update"
                })
            },
            dispose: function() {
                this.dispatchEvent({
                    type: "dispose"
                })
            }
        }, i.EventDispatcher.prototype.apply(i.Texture.prototype), i.TextureIdCount = 0, i.CubeTexture = function(t, e, r, n, o, a, s, h, l) {
            e = void 0 !== e ? e : i.CubeReflectionMapping, i.Texture.call(this, t, e, r, n, o, a, s, h, l), this.images = t
        }, i.CubeTexture.prototype = Object.create(i.Texture.prototype), i.CubeTexture.prototype.constructor = i.CubeTexture, i.CubeTexture.clone = function(t) {
            return void 0 === t && (t = new i.CubeTexture), i.Texture.prototype.clone.call(this, t), t.images = this.images, t
        }, i.CompressedTexture = function(t, e, r, n, o, a, s, h, l, c, u) {
            i.Texture.call(this, null, a, s, h, l, c, n, o, u), this.image = {
                width: e,
                height: r
            }, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1
        }, i.CompressedTexture.prototype = Object.create(i.Texture.prototype), i.CompressedTexture.prototype.constructor = i.CompressedTexture, i.CompressedTexture.prototype.clone = function() {
            var t = new i.CompressedTexture;
            return i.Texture.prototype.clone.call(this, t), t
        }, i.DataTexture = function(t, e, r, n, o, a, s, h, l, c, u) {
            i.Texture.call(this, null, a, s, h, l, c, n, o, u), this.image = {
                data: t,
                width: e,
                height: r
            }
        }, i.DataTexture.prototype = Object.create(i.Texture.prototype), i.DataTexture.prototype.constructor = i.DataTexture, i.DataTexture.prototype.clone = function() {
            var t = new i.DataTexture;
            return i.Texture.prototype.clone.call(this, t), t
        }, i.VideoTexture = function(t, e, r, n, o, a, s, h, l) {
            i.Texture.call(this, t, e, r, n, o, a, s, h, l), this.generateMipmaps = !1;
            var c = this,
                u = function() {
                    requestAnimationFrame(u), t.readyState === t.HAVE_ENOUGH_DATA && (c.needsUpdate = !0)
                };
            u()
        }, i.VideoTexture.prototype = Object.create(i.Texture.prototype), i.VideoTexture.prototype.constructor = i.VideoTexture, i.Group = function() {
            i.Object3D.call(this), this.type = "Group"
        }, i.Group.prototype = Object.create(i.Object3D.prototype), i.Group.prototype.constructor = i.Group, i.PointCloud = function(t, e) {
            i.Object3D.call(this), this.type = "PointCloud", this.geometry = void 0 !== t ? t : new i.Geometry, this.material = void 0 !== e ? e : new i.PointCloudMaterial({
                color: 16777215 * Math.random()
            })
        }, i.PointCloud.prototype = Object.create(i.Object3D.prototype), i.PointCloud.prototype.constructor = i.PointCloud, i.PointCloud.prototype.raycast = function() {
            var t = new i.Matrix4,
                e = new i.Ray;
            return function(r, n) {
                var o = this,
                    a = o.geometry,
                    s = r.params.PointCloud.threshold;
                if (t.getInverse(this.matrixWorld), e.copy(r.ray).applyMatrix4(t), null === a.boundingBox || e.isIntersectionBox(a.boundingBox) !== !1) {
                    var h = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                        l = new i.Vector3,
                        c = function(t, i) {
                            var a = e.distanceToPoint(t);
                            if (a < h) {
                                var s = e.closestPointToPoint(t);
                                s.applyMatrix4(o.matrixWorld);
                                var l = r.ray.origin.distanceTo(s);
                                n.push({
                                    distance: l,
                                    distanceToRay: a,
                                    point: s.clone(),
                                    index: i,
                                    face: null,
                                    object: o
                                })
                            }
                        };
                    if (a instanceof i.BufferGeometry) {
                        var u = a.attributes,
                            f = u.position.array;
                        if (void 0 !== u.index) {
                            var p = u.index.array,
                                d = a.offsets;
                            if (0 === d.length) {
                                var m = {
                                    start: 0,
                                    count: p.length,
                                    index: 0
                                };
                                d = [m]
                            }
                            for (var g = 0, v = d.length; g < v; ++g)
                                for (var y = d[g].start, x = d[g].count, b = d[g].index, _ = y, w = y + x; _ < w; _++) {
                                    var M = b + p[_];
                                    l.fromArray(f, 3 * M), c(l, M)
                                }
                        } else
                            for (var S = f.length / 3, _ = 0; _ < S; _++) l.set(f[3 * _], f[3 * _ + 1], f[3 * _ + 2]), c(l, _)
                    } else
                        for (var T = this.geometry.vertices, _ = 0; _ < T.length; _++) c(T[_], _)
                }
            }
        }(), i.PointCloud.prototype.clone = function(t) {
            return void 0 === t && (t = new i.PointCloud(this.geometry, this.material)), i.Object3D.prototype.clone.call(this, t), t
        }, i.ParticleSystem = function(t, e) {
            return i.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new i.PointCloud(t, e)
        }, i.Line = function(t, e, r) {
            i.Object3D.call(this), this.type = "Line", this.geometry = void 0 !== t ? t : new i.Geometry, this.material = void 0 !== e ? e : new i.LineBasicMaterial({
                color: 16777215 * Math.random()
            }), this.mode = void 0 !== r ? r : i.LineStrip
        }, i.LineStrip = 0, i.LinePieces = 1, i.Line.prototype = Object.create(i.Object3D.prototype), i.Line.prototype.constructor = i.Line, i.Line.prototype.raycast = function() {
            var t = new i.Matrix4,
                e = new i.Ray,
                r = new i.Sphere;
            return function(n, o) {
                var a = n.linePrecision,
                    s = a * a,
                    h = this.geometry;
                if (null === h.boundingSphere && h.computeBoundingSphere(), r.copy(h.boundingSphere), r.applyMatrix4(this.matrixWorld), n.ray.isIntersectionSphere(r) !== !1) {
                    t.getInverse(this.matrixWorld), e.copy(n.ray).applyMatrix4(t);
                    var l = new i.Vector3,
                        c = new i.Vector3,
                        u = new i.Vector3,
                        f = new i.Vector3,
                        p = this.mode === i.LineStrip ? 1 : 2;
                    if (h instanceof i.BufferGeometry) {
                        var d = h.attributes;
                        if (void 0 !== d.index) {
                            var m = d.index.array,
                                g = d.position.array,
                                v = h.offsets;
                            0 === v.length && (v = [{
                                start: 0,
                                count: m.length,
                                index: 0
                            }]);
                            for (var y = 0; y < v.length; y++)
                                for (var x = v[y].start, b = v[y].count, _ = v[y].index, w = x; w < x + b - 1; w += p) {
                                    var M = _ + m[w],
                                        S = _ + m[w + 1];
                                    l.fromArray(g, 3 * M), c.fromArray(g, 3 * S);
                                    var T = e.distanceSqToSegment(l, c, f, u);
                                    if (!(T > s)) {
                                        var E = e.origin.distanceTo(f);
                                        E < n.near || E > n.far || o.push({
                                            distance: E,
                                            point: u.clone().applyMatrix4(this.matrixWorld),
                                            index: w,
                                            offsetIndex: y,
                                            face: null,
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else
                            for (var g = d.position.array, w = 0; w < g.length / 3 - 1; w += p) {
                                l.fromArray(g, 3 * w), c.fromArray(g, 3 * w + 3);
                                var T = e.distanceSqToSegment(l, c, f, u);
                                if (!(T > s)) {
                                    var E = e.origin.distanceTo(f);
                                    E < n.near || E > n.far || o.push({
                                        distance: E,
                                        point: u.clone().applyMatrix4(this.matrixWorld),
                                        index: w,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                    } else if (h instanceof i.Geometry)
                        for (var C = h.vertices, A = C.length, w = 0; w < A - 1; w += p) {
                            var T = e.distanceSqToSegment(C[w], C[w + 1], f, u);
                            if (!(T > s)) {
                                var E = e.origin.distanceTo(f);
                                E < n.near || E > n.far || o.push({
                                    distance: E,
                                    point: u.clone().applyMatrix4(this.matrixWorld),
                                    index: w,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                })
                            }
                        }
                }
            }
        }(), i.Line.prototype.clone = function(t) {
            return void 0 === t && (t = new i.Line(this.geometry, this.material, this.mode)), i.Object3D.prototype.clone.call(this, t), t
        }, i.Mesh = function(t, e) {
            i.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== t ? t : new i.Geometry, this.material = void 0 !== e ? e : new i.MeshBasicMaterial({
                color: 16777215 * Math.random()
            }), this.updateMorphTargets()
        }, i.Mesh.prototype = Object.create(i.Object3D.prototype), i.Mesh.prototype.constructor = i.Mesh, i.Mesh.prototype.updateMorphTargets = function() {
            if (void 0 !== this.geometry.morphTargets && this.geometry.morphTargets.length > 0) {
                this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                for (var t = 0, e = this.geometry.morphTargets.length; t < e; t++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[t].name] = t
            }
        }, i.Mesh.prototype.getMorphTargetIndexByName = function(t) {
            return void 0 !== this.morphTargetDictionary[t] ? this.morphTargetDictionary[t] : (i.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + t + " does not exist. Returning 0."), 0)
        }, i.Mesh.prototype.raycast = function() {
            var t = new i.Matrix4,
                e = new i.Ray,
                r = new i.Sphere,
                n = new i.Vector3,
                o = new i.Vector3,
                a = new i.Vector3;
            return function(s, h) {
                var l = this.geometry;
                if (null === l.boundingSphere && l.computeBoundingSphere(), r.copy(l.boundingSphere), r.applyMatrix4(this.matrixWorld), s.ray.isIntersectionSphere(r) !== !1 && (t.getInverse(this.matrixWorld), e.copy(s.ray).applyMatrix4(t), null === l.boundingBox || e.isIntersectionBox(l.boundingBox) !== !1))
                    if (l instanceof i.BufferGeometry) {
                        var c = this.material;
                        if (void 0 === c) return;
                        var u, f, p, d = l.attributes,
                            m = s.precision;
                        if (void 0 !== d.index) {
                            var g = d.index.array,
                                v = d.position.array,
                                y = l.offsets;
                            0 === y.length && (y = [{
                                start: 0,
                                count: g.length,
                                index: 0
                            }]);
                            for (var x = 0, b = y.length; x < b; ++x)
                                for (var _ = y[x].start, w = y[x].count, M = y[x].index, S = _, T = _ + w; S < T; S += 3) {
                                    if (u = M + g[S], f = M + g[S + 1], p = M + g[S + 2], n.fromArray(v, 3 * u), o.fromArray(v, 3 * f), a.fromArray(v, 3 * p), c.side === i.BackSide) var E = e.intersectTriangle(a, o, n, !0);
                                    else var E = e.intersectTriangle(n, o, a, c.side !== i.DoubleSide);
                                    if (null !== E) {
                                        E.applyMatrix4(this.matrixWorld);
                                        var C = s.ray.origin.distanceTo(E);
                                        C < m || C < s.near || C > s.far || h.push({
                                            distance: C,
                                            point: E,
                                            face: new i.Face3(u, f, p, i.Triangle.normal(n, o, a)),
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else
                            for (var v = d.position.array, S = 0, A = 0, T = v.length; S < T; S += 3, A += 9) {
                                if (u = S, f = S + 1, p = S + 2, n.fromArray(v, A), o.fromArray(v, A + 3), a.fromArray(v, A + 6), c.side === i.BackSide) var E = e.intersectTriangle(a, o, n, !0);
                                else var E = e.intersectTriangle(n, o, a, c.side !== i.DoubleSide);
                                if (null !== E) {
                                    E.applyMatrix4(this.matrixWorld);
                                    var C = s.ray.origin.distanceTo(E);
                                    C < m || C < s.near || C > s.far || h.push({
                                        distance: C,
                                        point: E,
                                        face: new i.Face3(u, f, p, i.Triangle.normal(n, o, a)),
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                    } else if (l instanceof i.Geometry)
                    for (var u, f, p, L = this.material instanceof i.MeshFaceMaterial, P = L === !0 ? this.material.materials : null, m = s.precision, R = l.vertices, F = 0, D = l.faces.length; F < D; F++) {
                        var B = l.faces[F],
                            c = L === !0 ? P[B.materialIndex] : this.material;
                        if (void 0 !== c) {
                            if (u = R[B.a], f = R[B.b], p = R[B.c], c.morphTargets === !0) {
                                var U = l.morphTargets,
                                    V = this.morphTargetInfluences;
                                n.set(0, 0, 0), o.set(0, 0, 0), a.set(0, 0, 0);
                                for (var O = 0, z = U.length; O < z; O++) {
                                    var k = V[O];
                                    if (0 !== k) {
                                        var N = U[O].vertices;
                                        n.x += (N[B.a].x - u.x) * k, n.y += (N[B.a].y - u.y) * k, n.z += (N[B.a].z - u.z) * k, o.x += (N[B.b].x - f.x) * k, o.y += (N[B.b].y - f.y) * k, o.z += (N[B.b].z - f.z) * k, a.x += (N[B.c].x - p.x) * k, a.y += (N[B.c].y - p.y) * k, a.z += (N[B.c].z - p.z) * k
                                    }
                                }
                                n.add(u), o.add(f), a.add(p), u = n, f = o, p = a
                            }
                            if (c.side === i.BackSide) var E = e.intersectTriangle(p, f, u, !0);
                            else var E = e.intersectTriangle(u, f, p, c.side !== i.DoubleSide);
                            if (null !== E) {
                                E.applyMatrix4(this.matrixWorld);
                                var C = s.ray.origin.distanceTo(E);
                                C < m || C < s.near || C > s.far || h.push({
                                    distance: C,
                                    point: E,
                                    face: B,
                                    faceIndex: F,
                                    object: this
                                })
                            }
                        }
                    }
            }
        }(), i.Mesh.prototype.clone = function(t, e) {
            return void 0 === t && (t = new i.Mesh(this.geometry, this.material)), i.Object3D.prototype.clone.call(this, t, e), t
        }, i.Bone = function(t) {
            i.Object3D.call(this), this.type = "Bone", this.skin = t
        }, i.Bone.prototype = Object.create(i.Object3D.prototype), i.Bone.prototype.constructor = i.Bone, i.Skeleton = function(t, e, r) {
            if (this.useVertexTexture = void 0 === r || r, this.identityMatrix = new i.Matrix4, t = t || [], this.bones = t.slice(0), this.useVertexTexture) {
                var n;
                n = this.bones.length > 256 ? 64 : this.bones.length > 64 ? 32 : this.bones.length > 16 ? 16 : 8, this.boneTextureWidth = n, this.boneTextureHeight = n, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new i.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, i.RGBAFormat, i.FloatType), this.boneTexture.minFilter = i.NearestFilter, this.boneTexture.magFilter = i.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1
            } else this.boneMatrices = new Float32Array(16 * this.bones.length);
            if (void 0 === e) this.calculateInverses();
            else if (this.bones.length === e.length) this.boneInverses = e.slice(0);
            else {
                i.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
                for (var o = 0, a = this.bones.length; o < a; o++) this.boneInverses.push(new i.Matrix4)
            }
        }, i.Skeleton.prototype.calculateInverses = function() {
            this.boneInverses = [];
            for (var t = 0, e = this.bones.length; t < e; t++) {
                var r = new i.Matrix4;
                this.bones[t] && r.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(r)
            }
        }, i.Skeleton.prototype.pose = function() {
            for (var t, e = 0, r = this.bones.length; e < r; e++) t = this.bones[e], t && t.matrixWorld.getInverse(this.boneInverses[e]);
            for (var e = 0, r = this.bones.length; e < r; e++) t = this.bones[e], t && (t.parent ? (t.matrix.getInverse(t.parent.matrixWorld), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale))
        }, i.Skeleton.prototype.update = function() {
            var t = new i.Matrix4;
            return function() {
                for (var e = 0, r = this.bones.length; e < r; e++) {
                    var i = this.bones[e] ? this.bones[e].matrixWorld : this.identityMatrix;
                    t.multiplyMatrices(i, this.boneInverses[e]), t.flattenToArrayOffset(this.boneMatrices, 16 * e)
                }
                this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
            }
        }(), i.SkinnedMesh = function(t, e, r) {
            i.Mesh.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new i.Matrix4, this.bindMatrixInverse = new i.Matrix4;
            var n = [];
            if (this.geometry && void 0 !== this.geometry.bones) {
                for (var o, a, s, h, l, c = 0, u = this.geometry.bones.length; c < u; ++c) a = this.geometry.bones[c], s = a.pos, h = a.rotq, l = a.scl, o = new i.Bone(this), n.push(o), o.name = a.name, o.position.set(s[0], s[1], s[2]), o.quaternion.set(h[0], h[1], h[2], h[3]), void 0 !== l ? o.scale.set(l[0], l[1], l[2]) : o.scale.set(1, 1, 1);
                for (var c = 0, u = this.geometry.bones.length; c < u; ++c) a = this.geometry.bones[c], a.parent !== -1 ? n[a.parent].add(n[c]) : this.add(n[c])
            }
            this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new i.Skeleton(n, (void 0), r))
        }, i.SkinnedMesh.prototype = Object.create(i.Mesh.prototype), i.SkinnedMesh.prototype.constructor = i.SkinnedMesh, i.SkinnedMesh.prototype.bind = function(t, e) {
            this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e)
        }, i.SkinnedMesh.prototype.pose = function() {
            this.skeleton.pose()
        }, i.SkinnedMesh.prototype.normalizeSkinWeights = function() {
            if (this.geometry instanceof i.Geometry)
                for (var t = 0; t < this.geometry.skinIndices.length; t++) {
                    var e = this.geometry.skinWeights[t],
                        r = 1 / e.lengthManhattan();
                    r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1)
                }
        }, i.SkinnedMesh.prototype.updateMatrixWorld = function(t) {
            i.Mesh.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : i.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
        }, i.SkinnedMesh.prototype.clone = function(t) {
            return void 0 === t && (t = new i.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), i.Mesh.prototype.clone.call(this, t), t
        }, i.MorphAnimMesh = function(t, e) {
            i.Mesh.call(this, t, e), this.type = "MorphAnimMesh", this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
        }, i.MorphAnimMesh.prototype = Object.create(i.Mesh.prototype), i.MorphAnimMesh.prototype.constructor = i.MorphAnimMesh, i.MorphAnimMesh.prototype.setFrameRange = function(t, e) {
            this.startKeyframe = t, this.endKeyframe = e, this.length = this.endKeyframe - this.startKeyframe + 1
        }, i.MorphAnimMesh.prototype.setDirectionForward = function() {
            this.direction = 1, this.directionBackwards = !1
        }, i.MorphAnimMesh.prototype.setDirectionBackward = function() {
            this.direction = -1, this.directionBackwards = !0
        }, i.MorphAnimMesh.prototype.parseAnimations = function() {
            var t = this.geometry;
            t.animations || (t.animations = {});
            for (var e, r = t.animations, i = /([a-z]+)_?(\d+)/, n = 0, o = t.morphTargets.length; n < o; n++) {
                var a = t.morphTargets[n],
                    s = a.name.match(i);
                if (s && s.length > 1) {
                    var h = s[1];
                    r[h] || (r[h] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var l = r[h];
                    n < l.start && (l.start = n), n > l.end && (l.end = n), e || (e = h)
                }
            }
            t.firstAnimation = e
        }, i.MorphAnimMesh.prototype.setAnimationLabel = function(t, e, r) {
            this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[t] = {
                start: e,
                end: r
            }
        }, i.MorphAnimMesh.prototype.playAnimation = function(t, e) {
            var r = this.geometry.animations[t];
            r ? (this.setFrameRange(r.start, r.end), this.duration = 1e3 * ((r.end - r.start) / e), this.time = 0) : i.warn("THREE.MorphAnimMesh: animation[" + t + "] undefined in .playAnimation()")
        }, i.MorphAnimMesh.prototype.updateAnimation = function(t) {
            var e = this.duration / this.length;
            this.time += this.direction * t, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, this.time < 0 && (this.time += this.duration));
            var r = this.startKeyframe + i.Math.clamp(Math.floor(this.time / e), 0, this.length - 1);
            r !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[r] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = r);
            var n = this.time % e / e;
            this.directionBackwards && (n = 1 - n), this.morphTargetInfluences[this.currentKeyframe] = n, this.morphTargetInfluences[this.lastKeyframe] = 1 - n
        }, i.MorphAnimMesh.prototype.interpolateTargets = function(t, e, r) {
            for (var i = this.morphTargetInfluences, n = 0, o = i.length; n < o; n++) i[n] = 0;
            t > -1 && (i[t] = 1 - r), e > -1 && (i[e] = r)
        }, i.MorphAnimMesh.prototype.clone = function(t) {
            return void 0 === t && (t = new i.MorphAnimMesh(this.geometry, this.material)), t.duration = this.duration, t.mirroredLoop = this.mirroredLoop, t.time = this.time, t.lastKeyframe = this.lastKeyframe, t.currentKeyframe = this.currentKeyframe, t.direction = this.direction, t.directionBackwards = this.directionBackwards, i.Mesh.prototype.clone.call(this, t), t
        }, i.LOD = function() {
            i.Object3D.call(this), this.objects = []
        }, i.LOD.prototype = Object.create(i.Object3D.prototype), i.LOD.prototype.constructor = i.LOD, i.LOD.prototype.addLevel = function(t, e) {
            void 0 === e && (e = 0), e = Math.abs(e);
            for (var r = 0; r < this.objects.length && !(e < this.objects[r].distance); r++);
            this.objects.splice(r, 0, {
                distance: e,
                object: t
            }), this.add(t)
        }, i.LOD.prototype.getObjectForDistance = function(t) {
            for (var e = 1, r = this.objects.length; e < r && !(t < this.objects[e].distance); e++);
            return this.objects[e - 1].object
        }, i.LOD.prototype.raycast = function() {
            var t = new i.Vector3;
            return function(e, r) {
                t.setFromMatrixPosition(this.matrixWorld);
                var i = e.ray.origin.distanceTo(t);
                this.getObjectForDistance(i).raycast(e, r)
            }
        }(), i.LOD.prototype.update = function() {
            var t = new i.Vector3,
                e = new i.Vector3;
            return function(r) {
                if (this.objects.length > 1) {
                    t.setFromMatrixPosition(r.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
                    var i = t.distanceTo(e);
                    this.objects[0].object.visible = !0;
                    for (var n = 1, o = this.objects.length; n < o && i >= this.objects[n].distance; n++) this.objects[n - 1].object.visible = !1, this.objects[n].object.visible = !0;
                    for (; n < o; n++) this.objects[n].object.visible = !1
                }
            }
        }(), i.LOD.prototype.clone = function(t) {
            void 0 === t && (t = new i.LOD), i.Object3D.prototype.clone.call(this, t);
            for (var e = 0, r = this.objects.length; e < r; e++) {
                var n = this.objects[e].object.clone();
                n.visible = 0 === e, t.addLevel(n, this.objects[e].distance)
            }
            return t
        }, i.Sprite = function() {
            var t = new Uint16Array([0, 1, 2, 0, 2, 3]),
                e = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]),
                r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                n = new i.BufferGeometry;
            return n.addAttribute("index", new i.BufferAttribute(t, 1)), n.addAttribute("position", new i.BufferAttribute(e, 3)), n.addAttribute("uv", new i.BufferAttribute(r, 2)),
                function(t) {
                    i.Object3D.call(this), this.type = "Sprite", this.geometry = n, this.material = void 0 !== t ? t : new i.SpriteMaterial
                }
        }(), i.Sprite.prototype = Object.create(i.Object3D.prototype), i.Sprite.prototype.constructor = i.Sprite, i.Sprite.prototype.raycast = function() {
            var t = new i.Vector3;
            return function(e, r) {
                t.setFromMatrixPosition(this.matrixWorld);
                var i = e.ray.distanceToPoint(t);
                i > this.scale.x || r.push({
                    distance: i,
                    point: this.position,
                    face: null,
                    object: this
                })
            }
        }(), i.Sprite.prototype.clone = function(t) {
            return void 0 === t && (t = new i.Sprite(this.material)), i.Object3D.prototype.clone.call(this, t), t
        }, i.Particle = i.Sprite, i.LensFlare = function(t, e, r, n, o) {
            i.Object3D.call(this), this.lensFlares = [], this.positionScreen = new i.Vector3, this.customUpdateCallback = void 0, void 0 !== t && this.add(t, e, r, n, o)
        }, i.LensFlare.prototype = Object.create(i.Object3D.prototype), i.LensFlare.prototype.constructor = i.LensFlare, i.LensFlare.prototype.add = function(t, e, r, n, o, a) {
            void 0 === e && (e = -1), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === o && (o = new i.Color(16777215)), void 0 === n && (n = i.NormalBlending), r = Math.min(r, Math.max(0, r)), this.lensFlares.push({
                texture: t,
                size: e,
                distance: r,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 1,
                opacity: a,
                color: o,
                blending: n
            })
        }, i.LensFlare.prototype.updateLensFlares = function() {
            var t, e, r = this.lensFlares.length,
                i = 2 * -this.positionScreen.x,
                n = 2 * -this.positionScreen.y;
            for (t = 0; t < r; t++) e = this.lensFlares[t], e.x = this.positionScreen.x + i * e.distance, e.y = this.positionScreen.y + n * e.distance, e.wantedRotation = e.x * Math.PI * .25, e.rotation += .25 * (e.wantedRotation - e.rotation)
        }, i.Scene = function() {
            i.Object3D.call(this), this.type = "Scene", this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
        }, i.Scene.prototype = Object.create(i.Object3D.prototype), i.Scene.prototype.constructor = i.Scene, i.Scene.prototype.clone = function(t) {
            return void 0 === t && (t = new i.Scene), i.Object3D.prototype.clone.call(this, t), null !== this.fog && (t.fog = this.fog.clone()), null !== this.overrideMaterial && (t.overrideMaterial = this.overrideMaterial.clone()), t.autoUpdate = this.autoUpdate, t.matrixAutoUpdate = this.matrixAutoUpdate, t
        }, i.Fog = function(t, e, r) {
            this.name = "", this.color = new i.Color(t), this.near = void 0 !== e ? e : 1, this.far = void 0 !== r ? r : 1e3
        }, i.Fog.prototype.clone = function() {
            return new i.Fog(this.color.getHex(), this.near, this.far)
        }, i.FogExp2 = function(t, e) {
            this.name = "", this.color = new i.Color(t), this.density = void 0 !== e ? e : 25e-5
        }, i.FogExp2.prototype.clone = function() {
            return new i.FogExp2(this.color.getHex(), this.density)
        }, i.ShaderChunk = {}, i.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n\tfloat distance = dot( planeNormal, point-pointOnPlane );\n\treturn point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n\tif ( decayExponent > 0.0 ) {\n\t  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n\t}\n\treturn 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n\treturn pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\n", i.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n", i.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\tfloat dotProduct = dot( transformedNormal, dirVector );\n\tvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t#endif\n\n\t#endif\n\n\t#ifdef WRAP_AROUND\n\n\t\tvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\tdirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tdirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n\t\t#endif\n\n\t#endif\n\n\tvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n\t#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\tpointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tpointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\tvLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\t\tlVector = normalize( lVector );\n\n\t\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\t\tvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t\tspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n\t\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\t\tspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\tvLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n\t\t\t#endif\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\tfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n\t\tvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n\t\t#endif\n\n\t}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack += ambientLightColor;\n\n#endif\n", i.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n\n#endif\n", i.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n\tvec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n\tvec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n", i.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif", i.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\t#ifdef USE_MORPHNORMALS\n\n\tvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n\t#else\n\n\tvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n\t#endif\n\n#endif\n";
        i.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n\tuniform float logDepthBufFC;\n\n#endif";
        i.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\n#endif", i.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n\t#endif\n\n#else\n\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n\t\t\t\t// specular\n\n\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\t// diffuse\n\n\t\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\tfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\tvec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t#else\n\n\t\t\t\tfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t#endif\n\n\t\t\ttotalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n\t\t\t// specular\n\n\t\t\tvec3 spotHalfVector = normalize( lVector + viewPosition );\n\t\t\tfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n\t\t\tfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n\t\t\ttotalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, dirVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n\t\t// specular\n\n\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n\t\t/*\n\t\t// fresnel term from skin shader\n\t\tconst float F0 = 0.128;\n\n\t\tfloat base = 1.0 - dot( viewPosition, dirHalfVector );\n\t\tfloat exponential = pow( base, 5.0 );\n\n\t\tfloat fresnel = exponential + F0 * ( 1.0 - exponential );\n\t\t*/\n\n\t\t/*\n\t\t// fresnel term from fresnel shader\n\t\tconst float mFresnelBias = 0.08;\n\t\tconst float mFresnelScale = 0.3;\n\t\tconst float mFresnelPower = 5.0;\n\n\t\tfloat fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n\t\t*/\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t// \t\tdirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n\t\tvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\ttotalDiffuseLight += hemiColor;\n\n\t\t// specular (sky light)\n\n\t\tvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n\t\tfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n\t\tfloat hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n\t\t// specular (ground light)\n\n\t\tvec3 lVectorGround = -lVector;\n\n\t\tvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n\t\tfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n\t\tfloat hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n\t\tfloat dotProductGround = dot( normal, lVectorGround );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n\t\tvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n\t}\n\n#endif\n\n#ifdef METAL\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n",
            i.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n\n#endif", i.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n\tvec3 morphedNormal = vec3( 0.0 );\n\n\tmorphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tmorphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tmorphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tmorphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n\tmorphedNormal += normal;\n\n#endif", i.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tuniform float refractionRatio;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\n\t#endif\n\n#endif\n", i.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif", i.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n\t// Per-Pixel Tangent Space Normal Mapping\n\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\n\t}\n\n#endif\n", i.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n", i.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\tuniform sampler2D lightMap;\n\n#endif", i.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n\t}\n\n#endif", i.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif", i.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor.xyz = inputToLinear( texelColor.xyz );\n\n\tdiffuseColor *= texelColor;\n\n#endif", i.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n\tvUv2 = uv2;\n\n#endif", i.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n\tdiffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n", i.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif\n", i.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n\tvColor.xyz = inputToLinear( color.xyz );\n\n#endif", i.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n\t#ifdef USE_MORPHTARGETS\n\n\tvec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\tvec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n\n#endif\n", i.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvarying vec3 vReflect;\n\n\tuniform float refractionRatio;\n\n#endif\n", i.ShaderChunk.linear_to_gamma_fragment = "\n\toutgoingLight = linearToOutput( outgoingLight );\n", i.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif", i.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n", i.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n\n#endif\n", i.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\t\tfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t#else\n\t\tfloat flipNormal = 1.0;\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#endif\n\n\tenvColor.xyz = inputToLinear( envColor.xyz );\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n", i.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif", i.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n\t#endif\n\n#endif", i.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_MORPHNORMALS\n\n\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif", i.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif", i.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n\t#else\n\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\n\t#endif\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n\t\tfogFactor = whiteCompliment( fogFactor );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\n\t#endif\n\t\n\toutgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif", i.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n\t// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n", i.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n\tvec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n\tvec3 objectNormal = morphedNormal;\n\n#else\n\n\tvec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n\tobjectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n", i.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n", i.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif", i.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif", i.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n\toutgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif", i.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\tuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif", i.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif", i.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n\tvec3 morphed = vec3( 0.0 );\n\tmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\tmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\tmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\tmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\tmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\tmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\tmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\tmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n\tmorphed += position;\n\n#endif", i.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t#else\n\n\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t#endif\n\n#endif\n", i.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n\t#ifdef SHADOWMAP_DEBUG\n\n\t\tvec3 frustumColors[3];\n\t\tfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n\t\tfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n\t\tfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n\t#endif\n\n\t#ifdef SHADOWMAP_CASCADE\n\n\t\tint inFrustumCount = 0;\n\n\t#endif\n\n\tfloat fDepth;\n\tvec3 shadowColor = vec3( 1.0 );\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n\t\t\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\t\t\t// don't shadow pixels outside of light frustum\n\t\t\t\t// use just first frustum (for cascades)\n\t\t\t\t// don't shadow pixels behind far plane of light frustum\n\n\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\tinFrustumCount += int( inFrustum );\n\t\t\tbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n\t\t#else\n\n\t\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\t#endif\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t\tshadowCoord.z += shadowBias[ i ];\n\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t/*\n\t\t\t\t\t\t// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n\t\t\t\t\t\t// must enroll loop manually\n\n\t\t\t\tfor ( float y = -1.25; y <= 1.25; y += 1.25 )\n\t\t\t\t\tfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n\t\t\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n\t\t\t\t\t\t\t\t// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n\t\t\t\t\t\t\t\t//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n\t\t\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\t\t\tif ( fDepth < shadowCoord.z )\n\t\t\t\t\t\t\tshadow += 1.0;\n\n\t\t\t\t}\n\n\t\t\t\tshadow /= 9.0;\n\n\t\t*/\n\n\t\t\t\tconst float shadowDelta = 1.0 / 9.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.25 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.25 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.25 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.25 * yPixelOffset;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.0 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.0 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.0 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.0 * yPixelOffset;\n\n\t\t\t\tmat3 shadowKernel;\n\t\t\t\tmat3 depthKernel;\n\n\t\t\t\tdepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tdepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tdepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tdepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tdepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tdepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tdepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tdepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tdepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n\t\t\t\tvec3 shadowZ = vec3( shadowCoord.z );\n\t\t\t\tshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n\t\t\t\tshadowKernel[0] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n\t\t\t\tshadowKernel[1] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n\t\t\t\tshadowKernel[2] *= vec3(0.25);\n\n\t\t\t\tvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n\t\t\t\tshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n\t\t\t\tshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n\t\t\t\tvec4 shadowValues;\n\t\t\t\tshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n\t\t\t\tshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n\t\t\t\tshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n\t\t\t\tshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n\t\t\t\tshadow = dot( shadowValues, vec4( 1.0 ) );\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#else\n\n\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\tif ( fDepth < shadowCoord.z )\n\n\t\t// spot with multiple shadows is darker\n\n\t\t\t\t\tshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n\t\t// spot with multiple shadows has the same color as single shadow spot\n\n\t\t// \t\t\t\t\tshadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n\t\t\t#endif\n\n\t\t}\n\n\n\t\t#ifdef SHADOWMAP_DEBUG\n\n\t\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\t\tif ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#else\n\n\t\t\t\tif ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t}\n\n\t// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n\tshadowColor = inputToLinear( shadowColor );\n\n\toutgoingLight = outgoingLight * shadowColor;\n\n#endif\n", i.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n\t#ifdef USE_SKINNING\n\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\n\t#elif defined( USE_MORPHTARGETS )\n\n\t\tvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n#endif\n", i.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n\tuniform sampler2D shadowMap[ MAX_SHADOWS ];\n\tuniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n\tuniform float shadowDarkness[ MAX_SHADOWS ];\n\tuniform float shadowBias[ MAX_SHADOWS ];\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n\tfloat unpackDepth( const in vec4 rgba_depth ) {\n\n\t\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\tfloat depth = dot( rgba_depth, bit_shift );\n\t\treturn depth;\n\n\t}\n\n#endif", i.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneGlobalMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n", i.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n\tuniform float logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\t#extension GL_EXT_frag_depth : enable\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n#endif", i.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n", i.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n", i.UniformsUtils = {
                merge: function(t) {
                    for (var e = {}, r = 0; r < t.length; r++) {
                        var i = this.clone(t[r]);
                        for (var n in i) e[n] = i[n]
                    }
                    return e
                },
                clone: function(t) {
                    var e = {};
                    for (var r in t) {
                        e[r] = {};
                        for (var n in t[r]) {
                            var o = t[r][n];
                            o instanceof i.Color || o instanceof i.Vector2 || o instanceof i.Vector3 || o instanceof i.Vector4 || o instanceof i.Matrix4 || o instanceof i.Texture ? e[r][n] = o.clone() : o instanceof Array ? e[r][n] = o.slice() : e[r][n] = o
                        }
                    }
                    return e
                }
            }, i.UniformsLib = {
                common: {
                    diffuse: {
                        type: "c",
                        value: new i.Color(15658734)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new i.Vector4(0, 0, 1, 1)
                    },
                    lightMap: {
                        type: "t",
                        value: null
                    },
                    specularMap: {
                        type: "t",
                        value: null
                    },
                    alphaMap: {
                        type: "t",
                        value: null
                    },
                    envMap: {
                        type: "t",
                        value: null
                    },
                    flipEnvMap: {
                        type: "f",
                        value: -1
                    },
                    reflectivity: {
                        type: "f",
                        value: 1
                    },
                    refractionRatio: {
                        type: "f",
                        value: .98
                    },
                    morphTargetInfluences: {
                        type: "f",
                        value: 0
                    }
                },
                bump: {
                    bumpMap: {
                        type: "t",
                        value: null
                    },
                    bumpScale: {
                        type: "f",
                        value: 1
                    }
                },
                normalmap: {
                    normalMap: {
                        type: "t",
                        value: null
                    },
                    normalScale: {
                        type: "v2",
                        value: new i.Vector2(1, 1)
                    }
                },
                fog: {
                    fogDensity: {
                        type: "f",
                        value: 25e-5
                    },
                    fogNear: {
                        type: "f",
                        value: 1
                    },
                    fogFar: {
                        type: "f",
                        value: 2e3
                    },
                    fogColor: {
                        type: "c",
                        value: new i.Color(16777215)
                    }
                },
                lights: {
                    ambientLightColor: {
                        type: "fv",
                        value: []
                    },
                    directionalLightDirection: {
                        type: "fv",
                        value: []
                    },
                    directionalLightColor: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightDirection: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightSkyColor: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightGroundColor: {
                        type: "fv",
                        value: []
                    },
                    pointLightColor: {
                        type: "fv",
                        value: []
                    },
                    pointLightPosition: {
                        type: "fv",
                        value: []
                    },
                    pointLightDistance: {
                        type: "fv1",
                        value: []
                    },
                    pointLightDecay: {
                        type: "fv1",
                        value: []
                    },
                    spotLightColor: {
                        type: "fv",
                        value: []
                    },
                    spotLightPosition: {
                        type: "fv",
                        value: []
                    },
                    spotLightDirection: {
                        type: "fv",
                        value: []
                    },
                    spotLightDistance: {
                        type: "fv1",
                        value: []
                    },
                    spotLightAngleCos: {
                        type: "fv1",
                        value: []
                    },
                    spotLightExponent: {
                        type: "fv1",
                        value: []
                    },
                    spotLightDecay: {
                        type: "fv1",
                        value: []
                    }
                },
                particle: {
                    psColor: {
                        type: "c",
                        value: new i.Color(15658734)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    size: {
                        type: "f",
                        value: 1
                    },
                    scale: {
                        type: "f",
                        value: 1
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new i.Vector4(0, 0, 1, 1)
                    },
                    fogDensity: {
                        type: "f",
                        value: 25e-5
                    },
                    fogNear: {
                        type: "f",
                        value: 1
                    },
                    fogFar: {
                        type: "f",
                        value: 2e3
                    },
                    fogColor: {
                        type: "c",
                        value: new i.Color(16777215)
                    }
                },
                shadowmap: {
                    shadowMap: {
                        type: "tv",
                        value: []
                    },
                    shadowMapSize: {
                        type: "v2v",
                        value: []
                    },
                    shadowBias: {
                        type: "fv1",
                        value: []
                    },
                    shadowDarkness: {
                        type: "fv1",
                        value: []
                    },
                    shadowMatrix: {
                        type: "m4v",
                        value: []
                    }
                }
            }, i.ShaderLib = {
                basic: {
                    uniforms: i.UniformsUtils.merge([i.UniformsLib.common, i.UniformsLib.fog, i.UniformsLib.shadowmap]),
                    vertexShader: [i.ShaderChunk.common, i.ShaderChunk.map_pars_vertex, i.ShaderChunk.lightmap_pars_vertex, i.ShaderChunk.envmap_pars_vertex, i.ShaderChunk.color_pars_vertex, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.skinning_pars_vertex, i.ShaderChunk.shadowmap_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.map_vertex, i.ShaderChunk.lightmap_vertex, i.ShaderChunk.color_vertex, i.ShaderChunk.skinbase_vertex, "\t#ifdef USE_ENVMAP", i.ShaderChunk.morphnormal_vertex, i.ShaderChunk.skinnormal_vertex, i.ShaderChunk.defaultnormal_vertex, "\t#endif", i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.skinning_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, i.ShaderChunk.worldpos_vertex, i.ShaderChunk.envmap_vertex, i.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", i.ShaderChunk.common, i.ShaderChunk.color_pars_fragment, i.ShaderChunk.map_pars_fragment, i.ShaderChunk.alphamap_pars_fragment, i.ShaderChunk.lightmap_pars_fragment, i.ShaderChunk.envmap_pars_fragment, i.ShaderChunk.fog_pars_fragment, i.ShaderChunk.shadowmap_pars_fragment, i.ShaderChunk.specularmap_pars_fragment, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", i.ShaderChunk.logdepthbuf_fragment, i.ShaderChunk.map_fragment, i.ShaderChunk.color_fragment, i.ShaderChunk.alphamap_fragment, i.ShaderChunk.alphatest_fragment, i.ShaderChunk.specularmap_fragment, "\toutgoingLight = diffuseColor.rgb;", i.ShaderChunk.lightmap_fragment, i.ShaderChunk.envmap_fragment, i.ShaderChunk.shadowmap_fragment, i.ShaderChunk.linear_to_gamma_fragment, i.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                lambert: {
                    uniforms: i.UniformsUtils.merge([i.UniformsLib.common, i.UniformsLib.fog, i.UniformsLib.lights, i.UniformsLib.shadowmap, {
                        emissive: {
                            type: "c",
                            value: new i.Color(0)
                        },
                        wrapRGB: {
                            type: "v3",
                            value: new i.Vector3(1, 1, 1)
                        }
                    }]),
                    vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "\tvarying vec3 vLightBack;", "#endif", i.ShaderChunk.common, i.ShaderChunk.map_pars_vertex, i.ShaderChunk.lightmap_pars_vertex, i.ShaderChunk.envmap_pars_vertex, i.ShaderChunk.lights_lambert_pars_vertex, i.ShaderChunk.color_pars_vertex, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.skinning_pars_vertex, i.ShaderChunk.shadowmap_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.map_vertex, i.ShaderChunk.lightmap_vertex, i.ShaderChunk.color_vertex, i.ShaderChunk.morphnormal_vertex, i.ShaderChunk.skinbase_vertex, i.ShaderChunk.skinnormal_vertex, i.ShaderChunk.defaultnormal_vertex, i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.skinning_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, i.ShaderChunk.worldpos_vertex, i.ShaderChunk.envmap_vertex, i.ShaderChunk.lights_lambert_vertex, i.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "\tvarying vec3 vLightBack;", "#endif", i.ShaderChunk.common, i.ShaderChunk.color_pars_fragment, i.ShaderChunk.map_pars_fragment, i.ShaderChunk.alphamap_pars_fragment, i.ShaderChunk.lightmap_pars_fragment, i.ShaderChunk.envmap_pars_fragment, i.ShaderChunk.fog_pars_fragment, i.ShaderChunk.shadowmap_pars_fragment, i.ShaderChunk.specularmap_pars_fragment, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", i.ShaderChunk.logdepthbuf_fragment, i.ShaderChunk.map_fragment, i.ShaderChunk.color_fragment, i.ShaderChunk.alphamap_fragment, i.ShaderChunk.alphatest_fragment, i.ShaderChunk.specularmap_fragment, "\t#ifdef DOUBLE_SIDED", "\t\tif ( gl_FrontFacing )", "\t\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;", "\t\telse", "\t\t\toutgoingLight += diffuseColor.rgb * vLightBack + emissive;", "\t#else", "\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;", "\t#endif", i.ShaderChunk.lightmap_fragment, i.ShaderChunk.envmap_fragment, i.ShaderChunk.shadowmap_fragment, i.ShaderChunk.linear_to_gamma_fragment, i.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                phong: {
                    uniforms: i.UniformsUtils.merge([i.UniformsLib.common, i.UniformsLib.bump, i.UniformsLib.normalmap, i.UniformsLib.fog, i.UniformsLib.lights, i.UniformsLib.shadowmap, {
                        emissive: {
                            type: "c",
                            value: new i.Color(0)
                        },
                        specular: {
                            type: "c",
                            value: new i.Color(1118481)
                        },
                        shininess: {
                            type: "f",
                            value: 30
                        },
                        wrapRGB: {
                            type: "v3",
                            value: new i.Vector3(1, 1, 1)
                        }
                    }]),
                    vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "\tvarying vec3 vNormal;", "#endif", i.ShaderChunk.common, i.ShaderChunk.map_pars_vertex, i.ShaderChunk.lightmap_pars_vertex, i.ShaderChunk.envmap_pars_vertex, i.ShaderChunk.lights_phong_pars_vertex, i.ShaderChunk.color_pars_vertex, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.skinning_pars_vertex, i.ShaderChunk.shadowmap_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.map_vertex, i.ShaderChunk.lightmap_vertex, i.ShaderChunk.color_vertex, i.ShaderChunk.morphnormal_vertex, i.ShaderChunk.skinbase_vertex, i.ShaderChunk.skinnormal_vertex, i.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.skinning_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = -mvPosition.xyz;", i.ShaderChunk.worldpos_vertex, i.ShaderChunk.envmap_vertex, i.ShaderChunk.lights_phong_vertex, i.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", i.ShaderChunk.common, i.ShaderChunk.color_pars_fragment, i.ShaderChunk.map_pars_fragment, i.ShaderChunk.alphamap_pars_fragment, i.ShaderChunk.lightmap_pars_fragment, i.ShaderChunk.envmap_pars_fragment, i.ShaderChunk.fog_pars_fragment, i.ShaderChunk.lights_phong_pars_fragment, i.ShaderChunk.shadowmap_pars_fragment, i.ShaderChunk.bumpmap_pars_fragment, i.ShaderChunk.normalmap_pars_fragment, i.ShaderChunk.specularmap_pars_fragment, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", i.ShaderChunk.logdepthbuf_fragment, i.ShaderChunk.map_fragment, i.ShaderChunk.color_fragment, i.ShaderChunk.alphamap_fragment, i.ShaderChunk.alphatest_fragment, i.ShaderChunk.specularmap_fragment, i.ShaderChunk.lights_phong_fragment, i.ShaderChunk.lightmap_fragment, i.ShaderChunk.envmap_fragment, i.ShaderChunk.shadowmap_fragment, i.ShaderChunk.linear_to_gamma_fragment, i.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                particle_basic: {
                    uniforms: i.UniformsUtils.merge([i.UniformsLib.particle, i.UniformsLib.shadowmap]),
                    vertexShader: ["uniform float size;", "uniform float scale;", i.ShaderChunk.common, i.ShaderChunk.color_pars_vertex, i.ShaderChunk.shadowmap_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.color_vertex, "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "\t#ifdef USE_SIZEATTENUATION", "\t\tgl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "\t#else", "\t\tgl_PointSize = size;", "\t#endif", "\tgl_Position = projectionMatrix * mvPosition;", i.ShaderChunk.logdepthbuf_vertex, i.ShaderChunk.worldpos_vertex, i.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", i.ShaderChunk.common, i.ShaderChunk.color_pars_fragment, i.ShaderChunk.map_particle_pars_fragment, i.ShaderChunk.fog_pars_fragment, i.ShaderChunk.shadowmap_pars_fragment, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( psColor, opacity );", i.ShaderChunk.logdepthbuf_fragment, i.ShaderChunk.map_particle_fragment, i.ShaderChunk.color_fragment, i.ShaderChunk.alphatest_fragment, "\toutgoingLight = diffuseColor.rgb;", i.ShaderChunk.shadowmap_fragment, i.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                dashed: {
                    uniforms: i.UniformsUtils.merge([i.UniformsLib.common, i.UniformsLib.fog, {
                        scale: {
                            type: "f",
                            value: 1
                        },
                        dashSize: {
                            type: "f",
                            value: 1
                        },
                        totalSize: {
                            type: "f",
                            value: 2
                        }
                    }]),
                    vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", i.ShaderChunk.common, i.ShaderChunk.color_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.color_vertex, "\tvLineDistance = scale * lineDistance;", "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "\tgl_Position = projectionMatrix * mvPosition;", i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", i.ShaderChunk.common, i.ShaderChunk.color_pars_fragment, i.ShaderChunk.fog_pars_fragment, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tif ( mod( vLineDistance, totalSize ) > dashSize ) {", "\t\tdiscard;", "\t}", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", i.ShaderChunk.logdepthbuf_fragment, i.ShaderChunk.color_fragment, "\toutgoingLight = diffuseColor.rgb;", i.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                depth: {
                    uniforms: {
                        mNear: {
                            type: "f",
                            value: 1
                        },
                        mFar: {
                            type: "f",
                            value: 2e3
                        },
                        opacity: {
                            type: "f",
                            value: 1
                        }
                    },
                    vertexShader: [i.ShaderChunk.common, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", i.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT", "\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;", "\t#else", "\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;", "\t#endif", "\tfloat color = 1.0 - smoothstep( mNear, mFar, depth );", "\tgl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
                },
                normal: {
                    uniforms: {
                        opacity: {
                            type: "f",
                            value: 1
                        }
                    },
                    vertexShader: ["varying vec3 vNormal;", i.ShaderChunk.common, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvNormal = normalize( normalMatrix * normal );", i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tgl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", i.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                cube: {
                    uniforms: {
                        tCube: {
                            type: "t",
                            value: null
                        },
                        tFlip: {
                            type: "f",
                            value: -1
                        }
                    },
                    vertexShader: ["varying vec3 vWorldPosition;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvWorldPosition = transformDirection( position, modelMatrix );", "\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", i.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                equirect: {
                    uniforms: {
                        tEquirect: {
                            type: "t",
                            value: null
                        },
                        tFlip: {
                            type: "f",
                            value: -1
                        }
                    },
                    vertexShader: ["varying vec3 vWorldPosition;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvWorldPosition = transformDirection( position, modelMatrix );", "\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform sampler2D tEquirect;", "uniform float tFlip;", "varying vec3 vWorldPosition;", i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "vec3 direction = normalize( vWorldPosition );", "vec2 sampleUV;", "sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );", "sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "gl_FragColor = texture2D( tEquirect, sampleUV );", i.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                depthRGBA: {
                    uniforms: {},
                    vertexShader: [i.ShaderChunk.common, i.ShaderChunk.morphtarget_pars_vertex, i.ShaderChunk.skinning_pars_vertex, i.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", i.ShaderChunk.skinbase_vertex, i.ShaderChunk.morphtarget_vertex, i.ShaderChunk.skinning_vertex, i.ShaderChunk.default_vertex, i.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: [i.ShaderChunk.common, i.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "\tconst vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "\tvec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "\tres -= res.xxyz * bit_mask;", "\treturn res;", "}", "void main() {", i.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT", "\t\tgl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "\t#else", "\t\tgl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "\t#endif", "}"].join("\n")
                }
            }, i.WebGLRenderer = function(t) {
                function e(t) {
                    t.__webglVertexBuffer = Rt.createBuffer(), t.__webglColorBuffer = Rt.createBuffer(), Ft.info.memory.geometries++
                }

                function r(t) {
                    t.__webglVertexBuffer = Rt.createBuffer(), t.__webglColorBuffer = Rt.createBuffer(), t.__webglLineDistanceBuffer = Rt.createBuffer(), Ft.info.memory.geometries++
                }

                function n(t) {
                    t.__webglVertexBuffer = Rt.createBuffer(), t.__webglNormalBuffer = Rt.createBuffer(), t.__webglTangentBuffer = Rt.createBuffer(), t.__webglColorBuffer = Rt.createBuffer(), t.__webglUVBuffer = Rt.createBuffer(), t.__webglUV2Buffer = Rt.createBuffer(), t.__webglSkinIndicesBuffer = Rt.createBuffer(), t.__webglSkinWeightsBuffer = Rt.createBuffer(), t.__webglFaceBuffer = Rt.createBuffer(), t.__webglLineBuffer = Rt.createBuffer();
                    var e = t.numMorphTargets;
                    if (e) {
                        t.__webglMorphTargetsBuffers = [];
                        for (var r = 0, i = e; r < i; r++) t.__webglMorphTargetsBuffers.push(Rt.createBuffer())
                    }
                    var n = t.numMorphNormals;
                    if (n) {
                        t.__webglMorphNormalsBuffers = [];
                        for (var r = 0, i = n; r < i; r++) t.__webglMorphNormalsBuffers.push(Rt.createBuffer())
                    }
                    Ft.info.memory.geometries++
                }

                function o(t) {
                    var e = t.geometry,
                        r = t.material,
                        i = e.vertices.length;
                    if (r.attributes) {
                        void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
                        for (var n in r.attributes) {
                            var o = r.attributes[n];
                            if (!o.__webglInitialized || o.createUniqueBuffers) {
                                o.__webglInitialized = !0;
                                var a = 1;
                                "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3), o.size = a, o.array = new Float32Array(i * a), o.buffer = Rt.createBuffer(), o.buffer.belongsToAttribute = n, o.needsUpdate = !0
                            }
                            e.__webglCustomAttributesList.push(o)
                        }
                    }
                }

                function a(t, e) {
                    var r = t.vertices.length;
                    t.__vertexArray = new Float32Array(3 * r), t.__colorArray = new Float32Array(3 * r), t.__webglParticleCount = r, o(e)
                }

                function s(t, e) {
                    var r = t.vertices.length;
                    t.__vertexArray = new Float32Array(3 * r), t.__colorArray = new Float32Array(3 * r), t.__lineDistanceArray = new Float32Array(1 * r), t.__webglLineCount = r, o(e)
                }

                function h(t, e) {
                    var r = e.geometry,
                        i = t.faces3,
                        n = 3 * i.length,
                        o = 1 * i.length,
                        a = 3 * i.length,
                        s = l(e, t);
                    t.__vertexArray = new Float32Array(3 * n), t.__normalArray = new Float32Array(3 * n), t.__colorArray = new Float32Array(3 * n), t.__uvArray = new Float32Array(2 * n), r.faceVertexUvs.length > 1 && (t.__uv2Array = new Float32Array(2 * n)), r.hasTangents && (t.__tangentArray = new Float32Array(4 * n)), e.geometry.skinWeights.length && e.geometry.skinIndices.length && (t.__skinIndexArray = new Float32Array(4 * n), t.__skinWeightArray = new Float32Array(4 * n));
                    var h = null !== te.get("OES_element_index_uint") && o > 21845 ? Uint32Array : Uint16Array;
                    t.__typeArray = h, t.__faceArray = new h(3 * o), t.__lineArray = new h(2 * a);
                    var c = t.numMorphTargets;
                    if (c) {
                        t.__morphTargetsArrays = [];
                        for (var u = 0, f = c; u < f; u++) t.__morphTargetsArrays.push(new Float32Array(3 * n))
                    }
                    var p = t.numMorphNormals;
                    if (p) {
                        t.__morphNormalsArrays = [];
                        for (var u = 0, f = p; u < f; u++) t.__morphNormalsArrays.push(new Float32Array(3 * n))
                    }
                    if (t.__webglFaceCount = 3 * o, t.__webglLineCount = 2 * a, s.attributes) {
                        void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
                        for (var d in s.attributes) {
                            var m = s.attributes[d],
                                g = {};
                            for (var v in m) g[v] = m[v];
                            if (!g.__webglInitialized || g.createUniqueBuffers) {
                                g.__webglInitialized = !0;
                                var y = 1;
                                "v2" === g.type ? y = 2 : "v3" === g.type ? y = 3 : "v4" === g.type ? y = 4 : "c" === g.type && (y = 3), g.size = y, g.array = new Float32Array(n * y), g.buffer = Rt.createBuffer(), g.buffer.belongsToAttribute = d, m.needsUpdate = !0, g.__original = m
                            }
                            t.__webglCustomAttributesList.push(g)
                        }
                    }
                    t.__inittedArrays = !0
                }

                function l(t, e) {
                    return t.material instanceof i.MeshFaceMaterial ? t.material.materials[e.materialIndex] : t.material
                }

                function c(t) {
                    return t instanceof i.MeshPhongMaterial == !1 && t.shading === i.FlatShading
                }

                function u(t, e, r) {
                    var i, n, o, a, s, h, l, c, u, f, p, d = t.vertices,
                        m = d.length,
                        g = t.colors,
                        v = g.length,
                        y = t.__vertexArray,
                        x = t.__colorArray,
                        b = t.verticesNeedUpdate,
                        _ = t.colorsNeedUpdate,
                        w = t.__webglCustomAttributesList;
                    if (b) {
                        for (i = 0; i < m; i++) o = d[i], a = 3 * i, y[a] = o.x, y[a + 1] = o.y, y[a + 2] = o.z;
                        Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglVertexBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, y, e)
                    }
                    if (_) {
                        for (n = 0; n < v; n++) s = g[n], a = 3 * n, x[a] = s.r, x[a + 1] = s.g, x[a + 2] = s.b;
                        Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglColorBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, x, e)
                    }
                    if (w)
                        for (h = 0, l = w.length; h < l; h++) {
                            if (p = w[h], p.needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo))
                                if (u = p.value.length, a = 0, 1 === p.size)
                                    for (c = 0; c < u; c++) p.array[c] = p.value[c];
                                else if (2 === p.size)
                                for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, a += 2;
                            else if (3 === p.size)
                                if ("c" === p.type)
                                    for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.r, p.array[a + 1] = f.g, p.array[a + 2] = f.b, a += 3;
                                else
                                    for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, a += 3;
                            else if (4 === p.size)
                                for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, p.array[a + 3] = f.w, a += 4;
                            Rt.bindBuffer(Rt.ARRAY_BUFFER, p.buffer), Rt.bufferData(Rt.ARRAY_BUFFER, p.array, e), p.needsUpdate = !1
                        }
                }

                function f(t, e) {
                    var r, i, n, o, a, s, h, l, c, u, f, p, d = t.vertices,
                        m = t.colors,
                        g = t.lineDistances,
                        v = d.length,
                        y = m.length,
                        x = g.length,
                        b = t.__vertexArray,
                        _ = t.__colorArray,
                        w = t.__lineDistanceArray,
                        M = t.verticesNeedUpdate,
                        S = t.colorsNeedUpdate,
                        T = t.lineDistancesNeedUpdate,
                        E = t.__webglCustomAttributesList;
                    if (M) {
                        for (r = 0; r < v; r++) o = d[r], a = 3 * r, b[a] = o.x, b[a + 1] = o.y, b[a + 2] = o.z;
                        Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglVertexBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, b, e)
                    }
                    if (S) {
                        for (i = 0; i < y; i++) s = m[i], a = 3 * i, _[a] = s.r, _[a + 1] = s.g, _[a + 2] = s.b;
                        Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglColorBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, _, e)
                    }
                    if (T) {
                        for (n = 0; n < x; n++) w[n] = g[n];
                        Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglLineDistanceBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, w, e)
                    }
                    if (E)
                        for (h = 0, l = E.length; h < l; h++)
                            if (p = E[h], p.needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo)) {
                                if (a = 0, u = p.value.length, 1 === p.size)
                                    for (c = 0; c < u; c++) p.array[c] = p.value[c];
                                else if (2 === p.size)
                                    for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, a += 2;
                                else if (3 === p.size)
                                    if ("c" === p.type)
                                        for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.r, p.array[a + 1] = f.g, p.array[a + 2] = f.b, a += 3;
                                    else
                                        for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, a += 3;
                                else if (4 === p.size)
                                    for (c = 0; c < u; c++) f = p.value[c], p.array[a] = f.x, p.array[a + 1] = f.y, p.array[a + 2] = f.z, p.array[a + 3] = f.w, a += 4;
                                Rt.bindBuffer(Rt.ARRAY_BUFFER, p.buffer), Rt.bufferData(Rt.ARRAY_BUFFER, p.array, e), p.needsUpdate = !1
                            }
                }

                function p(t, e, r, n, o) {
                    if (t.__inittedArrays) {
                        var a, s, h, l, u, f, p, d, m, g, v, y, x, b, _, w, M, S, T, E, C, A, L, P, R, F, D, B, U, V, O, z, k, N, I, G, H, W, j, X, q, Y, K = c(o),
                            Q = 0,
                            Z = 0,
                            $ = 0,
                            J = 0,
                            tt = 0,
                            et = 0,
                            rt = 0,
                            it = 0,
                            nt = 0,
                            ot = 0,
                            at = 0,
                            st = 0,
                            ht = t.__vertexArray,
                            lt = t.__uvArray,
                            ct = t.__uv2Array,
                            ut = t.__normalArray,
                            ft = t.__tangentArray,
                            pt = t.__colorArray,
                            dt = t.__skinIndexArray,
                            mt = t.__skinWeightArray,
                            gt = t.__morphTargetsArrays,
                            vt = t.__morphNormalsArrays,
                            yt = t.__webglCustomAttributesList,
                            xt = t.__faceArray,
                            bt = t.__lineArray,
                            _t = e.geometry,
                            wt = _t.verticesNeedUpdate,
                            Mt = _t.elementsNeedUpdate,
                            St = _t.uvsNeedUpdate,
                            Tt = _t.normalsNeedUpdate,
                            Et = _t.tangentsNeedUpdate,
                            Ct = _t.colorsNeedUpdate,
                            At = _t.morphTargetsNeedUpdate,
                            Lt = _t.vertices,
                            Pt = t.faces3,
                            Ft = _t.faces,
                            Dt = _t.faceVertexUvs[0],
                            Bt = _t.faceVertexUvs[1],
                            Ut = _t.skinIndices,
                            Vt = _t.skinWeights,
                            Ot = _t.morphTargets,
                            zt = _t.morphNormals;
                        if (wt) {
                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], y = Lt[l.a], x = Lt[l.b], b = Lt[l.c], ht[Z] = y.x, ht[Z + 1] = y.y, ht[Z + 2] = y.z, ht[Z + 3] = x.x, ht[Z + 4] = x.y, ht[Z + 5] = x.z, ht[Z + 6] = b.x, ht[Z + 7] = b.y, ht[Z + 8] = b.z, Z += 9;
                            Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglVertexBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, ht, r)
                        }
                        if (At)
                            for (I = 0, G = Ot.length; I < G; I++) {
                                for (at = 0, a = 0, s = Pt.length; a < s; a++) j = Pt[a], l = Ft[j], y = Ot[I].vertices[l.a], x = Ot[I].vertices[l.b], b = Ot[I].vertices[l.c], H = gt[I], H[at] = y.x, H[at + 1] = y.y, H[at + 2] = y.z, H[at + 3] = x.x, H[at + 4] = x.y, H[at + 5] = x.z, H[at + 6] = b.x, H[at + 7] = b.y, H[at + 8] = b.z, o.morphNormals && (K ? (S = zt[I].faceNormals[j], T = S, E = S) : (X = zt[I].vertexNormals[j], S = X.a, T = X.b, E = X.c), W = vt[I], W[at] = S.x, W[at + 1] = S.y, W[at + 2] = S.z, W[at + 3] = T.x, W[at + 4] = T.y, W[at + 5] = T.z, W[at + 6] = E.x, W[at + 7] = E.y, W[at + 8] = E.z), at += 9;
                                Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[I]), Rt.bufferData(Rt.ARRAY_BUFFER, gt[I], r), o.morphNormals && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[I]), Rt.bufferData(Rt.ARRAY_BUFFER, vt[I], r))
                            }
                        if (Vt.length) {
                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], P = Vt[l.a], R = Vt[l.b], F = Vt[l.c], mt[ot] = P.x, mt[ot + 1] = P.y, mt[ot + 2] = P.z, mt[ot + 3] = P.w, mt[ot + 4] = R.x, mt[ot + 5] = R.y, mt[ot + 6] = R.z, mt[ot + 7] = R.w, mt[ot + 8] = F.x, mt[ot + 9] = F.y, mt[ot + 10] = F.z, mt[ot + 11] = F.w, D = Ut[l.a], B = Ut[l.b], U = Ut[l.c], dt[ot] = D.x, dt[ot + 1] = D.y, dt[ot + 2] = D.z, dt[ot + 3] = D.w, dt[ot + 4] = B.x, dt[ot + 5] = B.y, dt[ot + 6] = B.z, dt[ot + 7] = B.w, dt[ot + 8] = U.x, dt[ot + 9] = U.y, dt[ot + 10] = U.z, dt[ot + 11] = U.w, ot += 12;
                            ot > 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglSkinIndicesBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, dt, r), Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglSkinWeightsBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, mt, r))
                        }
                        if (Ct) {
                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], p = l.vertexColors, d = l.color, 3 === p.length && o.vertexColors === i.VertexColors ? (C = p[0], A = p[1], L = p[2]) : (C = d, A = d, L = d), pt[nt] = C.r, pt[nt + 1] = C.g, pt[nt + 2] = C.b, pt[nt + 3] = A.r, pt[nt + 4] = A.g, pt[nt + 5] = A.b, pt[nt + 6] = L.r, pt[nt + 7] = L.g, pt[nt + 8] = L.b, nt += 9;
                            nt > 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglColorBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, pt, r))
                        }
                        if (Et && _t.hasTangents) {
                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], m = l.vertexTangents, _ = m[0], w = m[1], M = m[2], ft[rt] = _.x, ft[rt + 1] = _.y, ft[rt + 2] = _.z, ft[rt + 3] = _.w, ft[rt + 4] = w.x, ft[rt + 5] = w.y, ft[rt + 6] = w.z, ft[rt + 7] = w.w, ft[rt + 8] = M.x, ft[rt + 9] = M.y, ft[rt + 10] = M.z, ft[rt + 11] = M.w, rt += 12;
                            Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglTangentBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, ft, r)
                        }
                        if (Tt) {
                            for (a = 0, s = Pt.length; a < s; a++)
                                if (l = Ft[Pt[a]], u = l.vertexNormals, f = l.normal, 3 === u.length && K === !1)
                                    for (V = 0; V < 3; V++) z = u[V], ut[et] = z.x, ut[et + 1] = z.y, ut[et + 2] = z.z, et += 3;
                                else
                                    for (V = 0; V < 3; V++) ut[et] = f.x, ut[et + 1] = f.y, ut[et + 2] = f.z, et += 3;
                            Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglNormalBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, ut, r)
                        }
                        if (St && Dt) {
                            for (a = 0, s = Pt.length; a < s; a++)
                                if (h = Pt[a], g = Dt[h], void 0 !== g)
                                    for (V = 0; V < 3; V++) k = g[V], lt[$] = k.x, lt[$ + 1] = k.y, $ += 2;
                            $ > 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglUVBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, lt, r))
                        }
                        if (St && Bt) {
                            for (a = 0, s = Pt.length; a < s; a++)
                                if (h = Pt[a], v = Bt[h], void 0 !== v)
                                    for (V = 0; V < 3; V++) N = v[V], ct[J] = N.x, ct[J + 1] = N.y, J += 2;
                            J > 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglUV2Buffer), Rt.bufferData(Rt.ARRAY_BUFFER, ct, r))
                        }
                        if (Mt) {
                            for (a = 0, s = Pt.length; a < s; a++) xt[tt] = Q, xt[tt + 1] = Q + 1, xt[tt + 2] = Q + 2, tt += 3, bt[it] = Q, bt[it + 1] = Q + 1, bt[it + 2] = Q, bt[it + 3] = Q + 2, bt[it + 4] = Q + 1, bt[it + 5] = Q + 2, it += 6, Q += 3;
                            Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, t.__webglFaceBuffer), Rt.bufferData(Rt.ELEMENT_ARRAY_BUFFER, xt, r), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, t.__webglLineBuffer), Rt.bufferData(Rt.ELEMENT_ARRAY_BUFFER, bt, r)
                        }
                        if (yt)
                            for (V = 0, O = yt.length; V < O; V++)
                                if (Y = yt[V], Y.__original.needsUpdate) {
                                    if (st = 0, 1 === Y.size) {
                                        if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], Y.array[st] = Y.value[l.a], Y.array[st + 1] = Y.value[l.b], Y.array[st + 2] = Y.value[l.c], st += 3;
                                        else if ("faces" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], Y.array[st] = q, Y.array[st + 1] = q, Y.array[st + 2] = q, st += 3
                                    } else if (2 === Y.size) {
                                        if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], y = Y.value[l.a], x = Y.value[l.b], b = Y.value[l.c], Y.array[st] = y.x, Y.array[st + 1] = y.y, Y.array[st + 2] = x.x, Y.array[st + 3] = x.y, Y.array[st + 4] = b.x, Y.array[st + 5] = b.y, st += 6;
                                        else if ("faces" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], y = q, x = q, b = q, Y.array[st] = y.x, Y.array[st + 1] = y.y, Y.array[st + 2] = x.x, Y.array[st + 3] = x.y, Y.array[st + 4] = b.x, Y.array[st + 5] = b.y, st += 6
                                    } else if (3 === Y.size) {
                                        var kt;
                                        if (kt = "c" === Y.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], y = Y.value[l.a], x = Y.value[l.b], b = Y.value[l.c], Y.array[st] = y[kt[0]], Y.array[st + 1] = y[kt[1]], Y.array[st + 2] = y[kt[2]], Y.array[st + 3] = x[kt[0]], Y.array[st + 4] = x[kt[1]], Y.array[st + 5] = x[kt[2]], Y.array[st + 6] = b[kt[0]], Y.array[st + 7] = b[kt[1]], Y.array[st + 8] = b[kt[2]], st += 9;
                                        else if ("faces" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], y = q, x = q, b = q, Y.array[st] = y[kt[0]], Y.array[st + 1] = y[kt[1]], Y.array[st + 2] = y[kt[2]], Y.array[st + 3] = x[kt[0]], Y.array[st + 4] = x[kt[1]], Y.array[st + 5] = x[kt[2]], Y.array[st + 6] = b[kt[0]], Y.array[st + 7] = b[kt[1]], Y.array[st + 8] = b[kt[2]], st += 9;
                                        else if ("faceVertices" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], y = q[0], x = q[1], b = q[2], Y.array[st] = y[kt[0]], Y.array[st + 1] = y[kt[1]], Y.array[st + 2] = y[kt[2]], Y.array[st + 3] = x[kt[0]], Y.array[st + 4] = x[kt[1]], Y.array[st + 5] = x[kt[2]], Y.array[st + 6] = b[kt[0]], Y.array[st + 7] = b[kt[1]], Y.array[st + 8] = b[kt[2]], st += 9
                                    } else if (4 === Y.size)
                                        if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                            for (a = 0, s = Pt.length; a < s; a++) l = Ft[Pt[a]], y = Y.value[l.a], x = Y.value[l.b], b = Y.value[l.c], Y.array[st] = y.x, Y.array[st + 1] = y.y, Y.array[st + 2] = y.z, Y.array[st + 3] = y.w, Y.array[st + 4] = x.x, Y.array[st + 5] = x.y, Y.array[st + 6] = x.z, Y.array[st + 7] = x.w, Y.array[st + 8] = b.x, Y.array[st + 9] = b.y, Y.array[st + 10] = b.z, Y.array[st + 11] = b.w, st += 12;
                                        else if ("faces" === Y.boundTo)
                                        for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], y = q, x = q, b = q, Y.array[st] = y.x, Y.array[st + 1] = y.y, Y.array[st + 2] = y.z, Y.array[st + 3] = y.w, Y.array[st + 4] = x.x, Y.array[st + 5] = x.y, Y.array[st + 6] = x.z, Y.array[st + 7] = x.w, Y.array[st + 8] = b.x, Y.array[st + 9] = b.y, Y.array[st + 10] = b.z, Y.array[st + 11] = b.w, st += 12;
                                    else if ("faceVertices" === Y.boundTo)
                                        for (a = 0, s = Pt.length; a < s; a++) q = Y.value[Pt[a]], y = q[0], x = q[1], b = q[2], Y.array[st] = y.x, Y.array[st + 1] = y.y, Y.array[st + 2] = y.z, Y.array[st + 3] = y.w, Y.array[st + 4] = x.x, Y.array[st + 5] = x.y, Y.array[st + 6] = x.z, Y.array[st + 7] = x.w, Y.array[st + 8] = b.x, Y.array[st + 9] = b.y, Y.array[st + 10] = b.z, Y.array[st + 11] = b.w, st += 12;
                                    Rt.bindBuffer(Rt.ARRAY_BUFFER, Y.buffer), Rt.bufferData(Rt.ARRAY_BUFFER, Y.array, r)
                                }
                        n && (delete t.__inittedArrays, delete t.__colorArray, delete t.__normalArray, delete t.__tangentArray, delete t.__uvArray, delete t.__uv2Array, delete t.__faceArray, delete t.__vertexArray, delete t.__lineArray, delete t.__skinIndexArray, delete t.__skinWeightArray)
                    }
                }

                function d(t, e, r, i) {
                    for (var n = r.attributes, o = e.attributes, a = e.attributesKeys, s = 0, h = a.length; s < h; s++) {
                        var l = a[s],
                            c = o[l];
                        if (c >= 0) {
                            var u = n[l];
                            if (void 0 !== u) {
                                var f = u.itemSize;
                                Rt.bindBuffer(Rt.ARRAY_BUFFER, u.buffer), Jt.enableAttribute(c), Rt.vertexAttribPointer(c, f, Rt.FLOAT, !1, 0, i * f * 4)
                            } else void 0 !== t.defaultAttributeValues && (2 === t.defaultAttributeValues[l].length ? Rt.vertexAttrib2fv(c, t.defaultAttributeValues[l]) : 3 === t.defaultAttributeValues[l].length && Rt.vertexAttrib3fv(c, t.defaultAttributeValues[l]))
                        }
                    }
                    Jt.disableUnusedAttributes()
                }

                function m(t, e, r) {
                    var i = t.program.attributes;
                    if (r.morphTargetBase !== -1 && i.position >= 0 ? (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[r.morphTargetBase]), Jt.enableAttribute(i.position), Rt.vertexAttribPointer(i.position, 3, Rt.FLOAT, !1, 0, 0)) : i.position >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglVertexBuffer), Jt.enableAttribute(i.position), Rt.vertexAttribPointer(i.position, 3, Rt.FLOAT, !1, 0, 0)), r.morphTargetForcedOrder.length)
                        for (var n, o = 0, a = r.morphTargetForcedOrder, s = r.morphTargetInfluences; o < t.numSupportedMorphTargets && o < a.length;) n = i["morphTarget" + o], n >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[a[o]]), Jt.enableAttribute(n), Rt.vertexAttribPointer(n, 3, Rt.FLOAT, !1, 0, 0)), n = i["morphNormal" + o], n >= 0 && t.morphNormals && (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[a[o]]), Jt.enableAttribute(n), Rt.vertexAttribPointer(n, 3, Rt.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[o] = s[a[o]], o++;
                    else {
                        var h = [],
                            s = r.morphTargetInfluences,
                            l = r.geometry.morphTargets;
                        s.length > l.length && (console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array."), s.length = l.length);
                        for (var c = 0, u = s.length; c < u; c++) {
                            var f = s[c];
                            h.push([f, c])
                        }
                        h.length > t.numSupportedMorphTargets ? (h.sort(y), h.length = t.numSupportedMorphTargets) : h.length > t.numSupportedMorphNormals ? h.sort(y) : 0 === h.length && h.push([0, 0]);
                        for (var n, o = 0, p = t.numSupportedMorphTargets; o < p; o++)
                            if (h[o]) {
                                var d = h[o][1];
                                n = i["morphTarget" + o], n >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[d]), Jt.enableAttribute(n), Rt.vertexAttribPointer(n, 3, Rt.FLOAT, !1, 0, 0)), n = i["morphNormal" + o], n >= 0 && t.morphNormals && (Rt.bindBuffer(Rt.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[d]), Jt.enableAttribute(n), Rt.vertexAttribPointer(n, 3, Rt.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[o] = s[d]
                            } else r.__webglMorphTargetInfluences[o] = 0
                    }
                    null !== t.program.uniforms.morphTargetInfluences && Rt.uniform1fv(t.program.uniforms.morphTargetInfluences, r.__webglMorphTargetInfluences)
                }

                function g(t, e) {
                    return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
                }

                function v(t, e) {
                    return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
                }

                function y(t, e) {
                    return e[0] - t[0]
                }

                function x(t) {
                    if (t.visible !== !1) {
                        if (t instanceof i.Scene || t instanceof i.Group);
                        else if (S(t), t instanceof i.Light) St.push(t);
                        else if (t instanceof i.Sprite) Lt.push(t);
                        else if (t instanceof i.LensFlare) Pt.push(t);
                        else {
                            var e = Tt[t.id];
                            if (e && (t.frustumCulled === !1 || Xt.intersectsObject(t) === !0))
                                for (var r = 0, n = e.length; r < n; r++) {
                                    var o = e[r];
                                    M(o), o.render = !0, Ft.sortObjects === !0 && (Yt.setFromMatrixPosition(t.matrixWorld), Yt.applyProjection(qt), o.z = Yt.z)
                                }
                        }
                        for (var r = 0, n = t.children.length; r < n; r++) x(t.children[r])
                    }
                }

                function b(t, e, r, n, o) {
                    for (var a, s = 0, h = t.length; s < h; s++) {
                        var l = t[s],
                            c = l.object,
                            u = l.buffer;
                        if (Q(c, e), o) a = o;
                        else {
                            if (a = l.material, !a) continue;
                            U(a)
                        }
                        Ft.setMaterialFaces(a), u instanceof i.BufferGeometry ? Ft.renderBufferDirect(e, r, n, a, u, c) : Ft.renderBuffer(e, r, n, a, u, c)
                    }
                }

                function _(t, e, r, i, n, o) {
                    for (var a, s = 0, h = t.length; s < h; s++) {
                        var l = t[s],
                            c = l.object;
                        if (c.visible) {
                            if (o) a = o;
                            else {
                                if (a = l[e], !a) continue;
                                U(a)
                            }
                            Ft.renderImmediateObject(r, i, n, a, c)
                        }
                    }
                }

                function w(t) {
                    var e = t.object,
                        r = e.material;
                    r.transparent ? (t.transparent = r, t.opaque = null) : (t.opaque = r, t.transparent = null)
                }

                function M(t) {
                    var e = t.object,
                        r = t.buffer,
                        n = e.geometry,
                        o = e.material;
                    if (o instanceof i.MeshFaceMaterial) {
                        var a = n instanceof i.BufferGeometry ? 0 : r.materialIndex;
                        o = o.materials[a], t.material = o, o.transparent ? At.push(t) : Ct.push(t)
                    } else o && (t.material = o, o.transparent ? At.push(t) : Ct.push(t))
                }

                function S(t) {
                    void 0 === t.__webglInit && (t.__webglInit = !0, t._modelViewMatrix = new i.Matrix4, t._normalMatrix = new i.Matrix3, t.addEventListener("removed", be));
                    var n = t.geometry;
                    if (void 0 === n || void 0 === n.__webglInit && (n.__webglInit = !0, n.addEventListener("dispose", _e), n instanceof i.BufferGeometry ? Ft.info.memory.geometries++ : t instanceof i.Mesh ? E(t, n) : t instanceof i.Line ? void 0 === n.__webglVertexBuffer && (r(n), s(n, t), n.verticesNeedUpdate = !0, n.colorsNeedUpdate = !0, n.lineDistancesNeedUpdate = !0) : t instanceof i.PointCloud && void 0 === n.__webglVertexBuffer && (e(n), a(n, t), n.verticesNeedUpdate = !0, n.colorsNeedUpdate = !0)), void 0 === t.__webglActive)
                        if (t.__webglActive = !0, t instanceof i.Mesh) {
                            if (n instanceof i.BufferGeometry) C(Tt, n, t);
                            else if (n instanceof i.Geometry)
                                for (var o = Pe[n.id], h = 0, l = o.length; h < l; h++) C(Tt, o[h], t)
                        } else t instanceof i.Line || t instanceof i.PointCloud ? C(Tt, n, t) : (t instanceof i.ImmediateRenderObject || t.immediateRenderCallback) && A(Et, t)
                }

                function T(t, e) {
                    for (var r, i, n = te.get("OES_element_index_uint") ? 4294967296 : 65535, o = {}, a = t.morphTargets.length, s = t.morphNormals.length, h = {}, l = [], c = 0, u = t.faces.length; c < u; c++) {
                        var f = t.faces[c],
                            p = e ? f.materialIndex : 0;
                        p in o || (o[p] = {
                            hash: p,
                            counter: 0
                        }), r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                            id: Re++,
                            faces3: [],
                            materialIndex: p,
                            vertices: 0,
                            numMorphTargets: a,
                            numMorphNormals: s
                        }, h[r] = i, l.push(i)), h[r].vertices + 3 > n && (o[p].counter += 1, r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                            id: Re++,
                            faces3: [],
                            materialIndex: p,
                            vertices: 0,
                            numMorphTargets: a,
                            numMorphNormals: s
                        }, h[r] = i, l.push(i))), h[r].faces3.push(c), h[r].vertices += 3
                    }
                    return l
                }

                function E(t, e) {
                    var r = t.material,
                        o = !1;
                    void 0 !== Pe[e.id] && e.groupsNeedUpdate !== !0 || (delete Tt[t.id], Pe[e.id] = T(e, r instanceof i.MeshFaceMaterial), e.groupsNeedUpdate = !1);
                    for (var a = Pe[e.id], s = 0, l = a.length; s < l; s++) {
                        var c = a[s];
                        void 0 === c.__webglVertexBuffer ? (n(c), h(c, t), e.verticesNeedUpdate = !0, e.morphTargetsNeedUpdate = !0, e.elementsNeedUpdate = !0, e.uvsNeedUpdate = !0, e.normalsNeedUpdate = !0, e.tangentsNeedUpdate = !0, e.colorsNeedUpdate = !0, o = !0) : o = !1, (o || void 0 === t.__webglActive) && C(Tt, c, t)
                    }
                    t.__webglActive = !0
                }

                function C(t, e, r) {
                    var i = r.id;
                    t[i] = t[i] || [], t[i].push({
                        id: i,
                        buffer: e,
                        object: r,
                        material: null,
                        z: 0
                    })
                }

                function A(t, e) {
                    t.push({
                        id: null,
                        object: e,
                        opaque: null,
                        transparent: null,
                        z: 0
                    })
                }

                function L(t) {
                    var e = t.geometry;
                    if (e instanceof i.BufferGeometry)
                        for (var r = e.attributes, n = e.attributesKeys, o = 0, a = n.length; o < a; o++) {
                            var s = n[o],
                                h = r[s],
                                c = "index" === s ? Rt.ELEMENT_ARRAY_BUFFER : Rt.ARRAY_BUFFER;
                            void 0 === h.buffer ? (h.buffer = Rt.createBuffer(), Rt.bindBuffer(c, h.buffer), Rt.bufferData(c, h.array, h instanceof i.DynamicBufferAttribute ? Rt.DYNAMIC_DRAW : Rt.STATIC_DRAW), h.needsUpdate = !1) : h.needsUpdate === !0 && (Rt.bindBuffer(c, h.buffer), void 0 === h.updateRange || h.updateRange.count === -1 ? Rt.bufferSubData(c, 0, h.array) : 0 === h.updateRange.count ? console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.") : (Rt.bufferSubData(c, h.updateRange.offset * h.array.BYTES_PER_ELEMENT, h.array.subarray(h.updateRange.offset, h.updateRange.offset + h.updateRange.count)), h.updateRange.count = 0), h.needsUpdate = !1)
                        } else if (t instanceof i.Mesh) {
                            e.groupsNeedUpdate === !0 && E(t, e);
                            for (var d = Pe[e.id], o = 0, m = d.length; o < m; o++) {
                                var g = d[o],
                                    v = l(t, g),
                                    y = v.attributes && P(v);
                                (e.verticesNeedUpdate || e.morphTargetsNeedUpdate || e.elementsNeedUpdate || e.uvsNeedUpdate || e.normalsNeedUpdate || e.colorsNeedUpdate || e.tangentsNeedUpdate || y) && p(g, t, Rt.DYNAMIC_DRAW, !e.dynamic, v)
                            }
                            e.verticesNeedUpdate = !1, e.morphTargetsNeedUpdate = !1, e.elementsNeedUpdate = !1, e.uvsNeedUpdate = !1, e.normalsNeedUpdate = !1, e.colorsNeedUpdate = !1, e.tangentsNeedUpdate = !1, v.attributes && R(v)
                        } else if (t instanceof i.Line) {
                        var v = l(t, e),
                            y = v.attributes && P(v);
                        (e.verticesNeedUpdate || e.colorsNeedUpdate || e.lineDistancesNeedUpdate || y) && f(e, Rt.DYNAMIC_DRAW), e.verticesNeedUpdate = !1, e.colorsNeedUpdate = !1, e.lineDistancesNeedUpdate = !1, v.attributes && R(v)
                    } else if (t instanceof i.PointCloud) {
                        var v = l(t, e),
                            y = v.attributes && P(v);
                        (e.verticesNeedUpdate || e.colorsNeedUpdate || y) && u(e, Rt.DYNAMIC_DRAW, t), e.verticesNeedUpdate = !1, e.colorsNeedUpdate = !1, v.attributes && R(v)
                    }
                }

                function P(t) {
                    for (var e in t.attributes)
                        if (t.attributes[e].needsUpdate) return !0;
                    return !1
                }

                function R(t) {
                    for (var e in t.attributes) t.attributes[e].needsUpdate = !1
                }

                function F(t) {
                    t instanceof i.Mesh || t instanceof i.PointCloud || t instanceof i.Line ? delete Tt[t.id] : (t instanceof i.ImmediateRenderObject || t.immediateRenderCallback) && D(Et, t), delete t.__webglInit, delete t._modelViewMatrix, delete t._normalMatrix, delete t.__webglActive
                }

                function D(t, e) {
                    for (var r = t.length - 1; r >= 0; r--) t[r].object === e && t.splice(r, 1)
                }

                function B(t, e, r, n) {
                    t.addEventListener("dispose", Se);
                    var o = Fe[t.type];
                    if (o) {
                        var a = i.ShaderLib[o];
                        t.__webglShader = {
                            uniforms: i.UniformsUtils.clone(a.uniforms),
                            vertexShader: a.vertexShader,
                            fragmentShader: a.fragmentShader
                        }
                    } else t.__webglShader = {
                        uniforms: t.uniforms,
                        vertexShader: t.vertexShader,
                        fragmentShader: t.fragmentShader
                    };
                    var s = lt(e),
                        h = ct(e),
                        l = ht(n),
                        c = {
                            precision: dt,
                            supportsVertexTextures: he,
                            map: !!t.map,
                            envMap: !!t.envMap,
                            envMapMode: t.envMap && t.envMap.mapping,
                            lightMap: !!t.lightMap,
                            bumpMap: !!t.bumpMap,
                            normalMap: !!t.normalMap,
                            specularMap: !!t.specularMap,
                            alphaMap: !!t.alphaMap,
                            combine: t.combine,
                            vertexColors: t.vertexColors,
                            fog: r,
                            useFog: t.fog,
                            fogExp: r instanceof i.FogExp2,
                            flatShading: t.shading === i.FlatShading,
                            sizeAttenuation: t.sizeAttenuation,
                            logarithmicDepthBuffer: _t,
                            skinning: t.skinning,
                            maxBones: l,
                            useVertexTexture: le && n && n.skeleton && n.skeleton.useVertexTexture,
                            morphTargets: t.morphTargets,
                            morphNormals: t.morphNormals,
                            maxMorphTargets: Ft.maxMorphTargets,
                            maxMorphNormals: Ft.maxMorphNormals,
                            maxDirLights: s.directional,
                            maxPointLights: s.point,
                            maxSpotLights: s.spot,
                            maxHemiLights: s.hemi,
                            maxShadows: h,
                            shadowMapEnabled: Ft.shadowMapEnabled && n.receiveShadow && h > 0,
                            shadowMapType: Ft.shadowMapType,
                            shadowMapDebug: Ft.shadowMapDebug,
                            shadowMapCascade: Ft.shadowMapCascade,
                            alphaTest: t.alphaTest,
                            metal: t.metal,
                            wrapAround: t.wrapAround,
                            doubleSided: t.side === i.DoubleSide,
                            flipSided: t.side === i.BackSide
                        },
                        u = [];
                    if (o ? u.push(o) : (u.push(t.fragmentShader), u.push(t.vertexShader)), void 0 !== t.defines)
                        for (var f in t.defines) u.push(f), u.push(t.defines[f]);
                    for (var f in c) u.push(f), u.push(c[f]);
                    for (var p, d = u.join(), m = 0, g = Dt.length; m < g; m++) {
                        var v = Dt[m];
                        if (v.code === d) {
                            p = v, p.usedTimes++;
                            break
                        }
                    }
                    void 0 === p && (p = new i.WebGLProgram(Ft, d, t, c), Dt.push(p), Ft.info.memory.programs = Dt.length),
                        t.program = p;
                    var y = p.attributes;
                    if (t.morphTargets) {
                        t.numSupportedMorphTargets = 0;
                        for (var x, b = "morphTarget", _ = 0; _ < Ft.maxMorphTargets; _++) x = b + _, y[x] >= 0 && t.numSupportedMorphTargets++
                    }
                    if (t.morphNormals) {
                        t.numSupportedMorphNormals = 0;
                        var x, b = "morphNormal";
                        for (_ = 0; _ < Ft.maxMorphNormals; _++) x = b + _, y[x] >= 0 && t.numSupportedMorphNormals++
                    }
                    t.uniformsList = [];
                    for (var w in t.__webglShader.uniforms) {
                        var M = t.program.uniforms[w];
                        M && t.uniformsList.push([t.__webglShader.uniforms[w], M])
                    }
                }

                function U(t) {
                    t.transparent === !0 ? Jt.setBlending(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha) : Jt.setBlending(i.NoBlending), Jt.setDepthTest(t.depthTest), Jt.setDepthWrite(t.depthWrite), Jt.setColorWrite(t.colorWrite), Jt.setPolygonOffset(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
                }

                function V(t, e, r, n, o) {
                    kt = 0, n.needsUpdate && (n.program && Le(n), B(n, e, r, o), n.needsUpdate = !1), n.morphTargets && (o.__webglMorphTargetInfluences || (o.__webglMorphTargetInfluences = new Float32Array(Ft.maxMorphTargets)));
                    var a = !1,
                        s = !1,
                        h = !1,
                        l = n.program,
                        c = l.uniforms,
                        u = n.__webglShader.uniforms;
                    if (l.id !== Bt && (Rt.useProgram(l.program), Bt = l.id, a = !0, s = !0, h = !0), n.id !== Vt && (Vt === -1 && (h = !0), Vt = n.id, s = !0), (a || t !== zt) && (Rt.uniformMatrix4fv(c.projectionMatrix, !1, t.projectionMatrix.elements), _t && Rt.uniform1f(c.logDepthBufFC, 2 / (Math.log(t.far + 1) / Math.LN2)), t !== zt && (zt = t), (n instanceof i.ShaderMaterial || n instanceof i.MeshPhongMaterial || n.envMap) && null !== c.cameraPosition && (Yt.setFromMatrixPosition(t.matrixWorld), Rt.uniform3f(c.cameraPosition, Yt.x, Yt.y, Yt.z)), (n instanceof i.MeshPhongMaterial || n instanceof i.MeshLambertMaterial || n instanceof i.MeshBasicMaterial || n instanceof i.ShaderMaterial || n.skinning) && null !== c.viewMatrix && Rt.uniformMatrix4fv(c.viewMatrix, !1, t.matrixWorldInverse.elements)), n.skinning)
                        if (o.bindMatrix && null !== c.bindMatrix && Rt.uniformMatrix4fv(c.bindMatrix, !1, o.bindMatrix.elements), o.bindMatrixInverse && null !== c.bindMatrixInverse && Rt.uniformMatrix4fv(c.bindMatrixInverse, !1, o.bindMatrixInverse.elements), le && o.skeleton && o.skeleton.useVertexTexture) {
                            if (null !== c.boneTexture) {
                                var f = Y();
                                Rt.uniform1i(c.boneTexture, f), Ft.setTexture(o.skeleton.boneTexture, f)
                            }
                            null !== c.boneTextureWidth && Rt.uniform1i(c.boneTextureWidth, o.skeleton.boneTextureWidth), null !== c.boneTextureHeight && Rt.uniform1i(c.boneTextureHeight, o.skeleton.boneTextureHeight)
                        } else o.skeleton && o.skeleton.boneMatrices && null !== c.boneGlobalMatrices && Rt.uniformMatrix4fv(c.boneGlobalMatrices, !1, o.skeleton.boneMatrices);
                    return s && (r && n.fog && I(u, r), (n instanceof i.MeshPhongMaterial || n instanceof i.MeshLambertMaterial || n.lights) && (Qt && (h = !0, $(e), Qt = !1), h ? (W(u, Zt), j(u, !0)) : j(u, !1)), (n instanceof i.MeshBasicMaterial || n instanceof i.MeshLambertMaterial || n instanceof i.MeshPhongMaterial) && O(u, n), n instanceof i.LineBasicMaterial ? z(u, n) : n instanceof i.LineDashedMaterial ? (z(u, n), k(u, n)) : n instanceof i.PointCloudMaterial ? N(u, n) : n instanceof i.MeshPhongMaterial ? G(u, n) : n instanceof i.MeshLambertMaterial ? H(u, n) : n instanceof i.MeshDepthMaterial ? (u.mNear.value = t.near, u.mFar.value = t.far, u.opacity.value = n.opacity) : n instanceof i.MeshNormalMaterial && (u.opacity.value = n.opacity), o.receiveShadow && !n._shadowPass && X(u, e), K(n.uniformsList)), q(c, o), null !== c.modelMatrix && Rt.uniformMatrix4fv(c.modelMatrix, !1, o.matrixWorld.elements), l
                }

                function O(t, e) {
                    t.opacity.value = e.opacity, t.diffuse.value = e.color, t.map.value = e.map, t.lightMap.value = e.lightMap, t.specularMap.value = e.specularMap, t.alphaMap.value = e.alphaMap, e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale));
                    var r;
                    if (e.map ? r = e.map : e.specularMap ? r = e.specularMap : e.normalMap ? r = e.normalMap : e.bumpMap ? r = e.bumpMap : e.alphaMap && (r = e.alphaMap), void 0 !== r) {
                        var n = r.offset,
                            o = r.repeat;
                        t.offsetRepeat.value.set(n.x, n.y, o.x, o.y)
                    }
                    t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap instanceof i.WebGLRenderTargetCube ? 1 : -1, t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio
                }

                function z(t, e) {
                    t.diffuse.value = e.color, t.opacity.value = e.opacity
                }

                function k(t, e) {
                    t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
                }

                function N(t, e) {
                    if (t.psColor.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size, t.scale.value = ut.height / 2, t.map.value = e.map, null !== e.map) {
                        var r = e.map.offset,
                            i = e.map.repeat;
                        t.offsetRepeat.value.set(r.x, r.y, i.x, i.y)
                    }
                }

                function I(t, e) {
                    t.fogColor.value = e.color, e instanceof i.Fog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e instanceof i.FogExp2 && (t.fogDensity.value = e.density)
                }

                function G(t, e) {
                    t.shininess.value = e.shininess, t.emissive.value = e.emissive, t.specular.value = e.specular, e.wrapAround && t.wrapRGB.value.copy(e.wrapRGB)
                }

                function H(t, e) {
                    t.emissive.value = e.emissive, e.wrapAround && t.wrapRGB.value.copy(e.wrapRGB)
                }

                function W(t, e) {
                    t.ambientLightColor.value = e.ambient, t.directionalLightColor.value = e.directional.colors, t.directionalLightDirection.value = e.directional.positions, t.pointLightColor.value = e.point.colors, t.pointLightPosition.value = e.point.positions, t.pointLightDistance.value = e.point.distances, t.pointLightDecay.value = e.point.decays, t.spotLightColor.value = e.spot.colors, t.spotLightPosition.value = e.spot.positions, t.spotLightDistance.value = e.spot.distances, t.spotLightDirection.value = e.spot.directions, t.spotLightAngleCos.value = e.spot.anglesCos, t.spotLightExponent.value = e.spot.exponents, t.spotLightDecay.value = e.spot.decays, t.hemisphereLightSkyColor.value = e.hemi.skyColors, t.hemisphereLightGroundColor.value = e.hemi.groundColors, t.hemisphereLightDirection.value = e.hemi.positions
                }

                function j(t, e) {
                    t.ambientLightColor.needsUpdate = e, t.directionalLightColor.needsUpdate = e, t.directionalLightDirection.needsUpdate = e, t.pointLightColor.needsUpdate = e, t.pointLightPosition.needsUpdate = e, t.pointLightDistance.needsUpdate = e, t.pointLightDecay.needsUpdate = e, t.spotLightColor.needsUpdate = e, t.spotLightPosition.needsUpdate = e, t.spotLightDistance.needsUpdate = e, t.spotLightDirection.needsUpdate = e, t.spotLightAngleCos.needsUpdate = e, t.spotLightExponent.needsUpdate = e, t.spotLightDecay.needsUpdate = e, t.hemisphereLightSkyColor.needsUpdate = e, t.hemisphereLightGroundColor.needsUpdate = e, t.hemisphereLightDirection.needsUpdate = e
                }

                function X(t, e) {
                    if (t.shadowMatrix)
                        for (var r = 0, n = 0, o = e.length; n < o; n++) {
                            var a = e[n];
                            a.castShadow && (a instanceof i.SpotLight || a instanceof i.DirectionalLight && !a.shadowCascade) && (t.shadowMap.value[r] = a.shadowMap, t.shadowMapSize.value[r] = a.shadowMapSize, t.shadowMatrix.value[r] = a.shadowMatrix, t.shadowDarkness.value[r] = a.shadowDarkness, t.shadowBias.value[r] = a.shadowBias, r++)
                        }
                }

                function q(t, e) {
                    Rt.uniformMatrix4fv(t.modelViewMatrix, !1, e._modelViewMatrix.elements), t.normalMatrix && Rt.uniformMatrix3fv(t.normalMatrix, !1, e._normalMatrix.elements)
                }

                function Y() {
                    var t = kt;
                    return t >= ne && i.warn("WebGLRenderer: trying to use " + t + " texture units while this GPU supports only " + ne), kt += 1, t
                }

                function K(t) {
                    for (var e, r, n, o = 0, a = t.length; o < a; o++) {
                        var s = t[o][0];
                        if (s.needsUpdate !== !1) {
                            var h = s.type,
                                l = s.value,
                                c = t[o][1];
                            switch (h) {
                                case "1i":
                                    Rt.uniform1i(c, l);
                                    break;
                                case "1f":
                                    Rt.uniform1f(c, l);
                                    break;
                                case "2f":
                                    Rt.uniform2f(c, l[0], l[1]);
                                    break;
                                case "3f":
                                    Rt.uniform3f(c, l[0], l[1], l[2]);
                                    break;
                                case "4f":
                                    Rt.uniform4f(c, l[0], l[1], l[2], l[3]);
                                    break;
                                case "1iv":
                                    Rt.uniform1iv(c, l);
                                    break;
                                case "3iv":
                                    Rt.uniform3iv(c, l);
                                    break;
                                case "1fv":
                                    Rt.uniform1fv(c, l);
                                    break;
                                case "2fv":
                                    Rt.uniform2fv(c, l);
                                    break;
                                case "3fv":
                                    Rt.uniform3fv(c, l);
                                    break;
                                case "4fv":
                                    Rt.uniform4fv(c, l);
                                    break;
                                case "Matrix3fv":
                                    Rt.uniformMatrix3fv(c, !1, l);
                                    break;
                                case "Matrix4fv":
                                    Rt.uniformMatrix4fv(c, !1, l);
                                    break;
                                case "i":
                                    Rt.uniform1i(c, l);
                                    break;
                                case "f":
                                    Rt.uniform1f(c, l);
                                    break;
                                case "v2":
                                    Rt.uniform2f(c, l.x, l.y);
                                    break;
                                case "v3":
                                    Rt.uniform3f(c, l.x, l.y, l.z);
                                    break;
                                case "v4":
                                    Rt.uniform4f(c, l.x, l.y, l.z, l.w);
                                    break;
                                case "c":
                                    Rt.uniform3f(c, l.r, l.g, l.b);
                                    break;
                                case "iv1":
                                    Rt.uniform1iv(c, l);
                                    break;
                                case "iv":
                                    Rt.uniform3iv(c, l);
                                    break;
                                case "fv1":
                                    Rt.uniform1fv(c, l);
                                    break;
                                case "fv":
                                    Rt.uniform3fv(c, l);
                                    break;
                                case "v2v":
                                    void 0 === s._array && (s._array = new Float32Array(2 * l.length));
                                    for (var u = 0, f = l.length; u < f; u++) n = 2 * u, s._array[n] = l[u].x, s._array[n + 1] = l[u].y;
                                    Rt.uniform2fv(c, s._array);
                                    break;
                                case "v3v":
                                    void 0 === s._array && (s._array = new Float32Array(3 * l.length));
                                    for (var u = 0, f = l.length; u < f; u++) n = 3 * u, s._array[n] = l[u].x, s._array[n + 1] = l[u].y, s._array[n + 2] = l[u].z;
                                    Rt.uniform3fv(c, s._array);
                                    break;
                                case "v4v":
                                    void 0 === s._array && (s._array = new Float32Array(4 * l.length));
                                    for (var u = 0, f = l.length; u < f; u++) n = 4 * u, s._array[n] = l[u].x, s._array[n + 1] = l[u].y, s._array[n + 2] = l[u].z, s._array[n + 3] = l[u].w;
                                    Rt.uniform4fv(c, s._array);
                                    break;
                                case "m3":
                                    Rt.uniformMatrix3fv(c, !1, l.elements);
                                    break;
                                case "m3v":
                                    void 0 === s._array && (s._array = new Float32Array(9 * l.length));
                                    for (var u = 0, f = l.length; u < f; u++) l[u].flattenToArrayOffset(s._array, 9 * u);
                                    Rt.uniformMatrix3fv(c, !1, s._array);
                                    break;
                                case "m4":
                                    Rt.uniformMatrix4fv(c, !1, l.elements);
                                    break;
                                case "m4v":
                                    void 0 === s._array && (s._array = new Float32Array(16 * l.length));
                                    for (var u = 0, f = l.length; u < f; u++) l[u].flattenToArrayOffset(s._array, 16 * u);
                                    Rt.uniformMatrix4fv(c, !1, s._array);
                                    break;
                                case "t":
                                    if (e = l, r = Y(), Rt.uniform1i(c, r), !e) continue;
                                    e instanceof i.CubeTexture || e.image instanceof Array && 6 === e.image.length ? et(e, r) : e instanceof i.WebGLRenderTargetCube ? rt(e, r) : Ft.setTexture(e, r);
                                    break;
                                case "tv":
                                    void 0 === s._array && (s._array = []);
                                    for (var u = 0, f = s.value.length; u < f; u++) s._array[u] = Y();
                                    Rt.uniform1iv(c, s._array);
                                    for (var u = 0, f = s.value.length; u < f; u++) e = s.value[u], r = s._array[u], e && Ft.setTexture(e, r);
                                    break;
                                default:
                                    i.warn("THREE.WebGLRenderer: Unknown uniform type: " + h)
                            }
                        }
                    }
                }

                function Q(t, e) {
                    t._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, t.matrixWorld), t._normalMatrix.getNormalMatrix(t._modelViewMatrix)
                }

                function Z(t, e, r, i) {
                    t[e] = r.r * i, t[e + 1] = r.g * i, t[e + 2] = r.b * i
                }

                function $(t) {
                    var e, r, n, o, a, s, h, l, c = 0,
                        u = 0,
                        f = 0,
                        p = Zt,
                        d = p.directional.colors,
                        m = p.directional.positions,
                        g = p.point.colors,
                        v = p.point.positions,
                        y = p.point.distances,
                        x = p.point.decays,
                        b = p.spot.colors,
                        _ = p.spot.positions,
                        w = p.spot.distances,
                        M = p.spot.directions,
                        S = p.spot.anglesCos,
                        T = p.spot.exponents,
                        E = p.spot.decays,
                        C = p.hemi.skyColors,
                        A = p.hemi.groundColors,
                        L = p.hemi.positions,
                        P = 0,
                        R = 0,
                        F = 0,
                        D = 0,
                        B = 0,
                        U = 0,
                        V = 0,
                        O = 0,
                        z = 0,
                        k = 0,
                        N = 0,
                        I = 0;
                    for (e = 0, r = t.length; e < r; e++)
                        if (n = t[e], !n.onlyShadow)
                            if (o = n.color, h = n.intensity, l = n.distance, n instanceof i.AmbientLight) {
                                if (!n.visible) continue;
                                c += o.r, u += o.g, f += o.b
                            } else if (n instanceof i.DirectionalLight) {
                        if (B += 1, !n.visible) continue;
                        Kt.setFromMatrixPosition(n.matrixWorld), Yt.setFromMatrixPosition(n.target.matrixWorld), Kt.sub(Yt), Kt.normalize(), z = 3 * P, m[z] = Kt.x, m[z + 1] = Kt.y, m[z + 2] = Kt.z, Z(d, z, o, h), P += 1
                    } else if (n instanceof i.PointLight) {
                        if (U += 1, !n.visible) continue;
                        k = 3 * R, Z(g, k, o, h), Yt.setFromMatrixPosition(n.matrixWorld), v[k] = Yt.x, v[k + 1] = Yt.y, v[k + 2] = Yt.z, y[R] = l, x[R] = 0 === n.distance ? 0 : n.decay, R += 1
                    } else if (n instanceof i.SpotLight) {
                        if (V += 1, !n.visible) continue;
                        N = 3 * F, Z(b, N, o, h), Kt.setFromMatrixPosition(n.matrixWorld), _[N] = Kt.x, _[N + 1] = Kt.y, _[N + 2] = Kt.z, w[F] = l, Yt.setFromMatrixPosition(n.target.matrixWorld), Kt.sub(Yt), Kt.normalize(), M[N] = Kt.x, M[N + 1] = Kt.y, M[N + 2] = Kt.z, S[F] = Math.cos(n.angle), T[F] = n.exponent, E[F] = 0 === n.distance ? 0 : n.decay, F += 1
                    } else if (n instanceof i.HemisphereLight) {
                        if (O += 1, !n.visible) continue;
                        Kt.setFromMatrixPosition(n.matrixWorld), Kt.normalize(), I = 3 * D, L[I] = Kt.x, L[I + 1] = Kt.y, L[I + 2] = Kt.z, a = n.color, s = n.groundColor, Z(C, I, a, h), Z(A, I, s, h), D += 1
                    }
                    for (e = 3 * P, r = Math.max(d.length, 3 * B); e < r; e++) d[e] = 0;
                    for (e = 3 * R, r = Math.max(g.length, 3 * U); e < r; e++) g[e] = 0;
                    for (e = 3 * F, r = Math.max(b.length, 3 * V); e < r; e++) b[e] = 0;
                    for (e = 3 * D, r = Math.max(C.length, 3 * O); e < r; e++) C[e] = 0;
                    for (e = 3 * D, r = Math.max(A.length, 3 * O); e < r; e++) A[e] = 0;
                    p.directional.length = P, p.point.length = R, p.spot.length = F, p.hemi.length = D, p.ambient[0] = c, p.ambient[1] = u, p.ambient[2] = f
                }

                function J(t, e, r) {
                    var n;
                    r ? (Rt.texParameteri(t, Rt.TEXTURE_WRAP_S, st(e.wrapS)), Rt.texParameteri(t, Rt.TEXTURE_WRAP_T, st(e.wrapT)), Rt.texParameteri(t, Rt.TEXTURE_MAG_FILTER, st(e.magFilter)), Rt.texParameteri(t, Rt.TEXTURE_MIN_FILTER, st(e.minFilter))) : (Rt.texParameteri(t, Rt.TEXTURE_WRAP_S, Rt.CLAMP_TO_EDGE), Rt.texParameteri(t, Rt.TEXTURE_WRAP_T, Rt.CLAMP_TO_EDGE), e.wrapS === i.ClampToEdgeWrapping && e.wrapT === i.ClampToEdgeWrapping || i.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + e.sourceFile + " )"), Rt.texParameteri(t, Rt.TEXTURE_MAG_FILTER, at(e.magFilter)), Rt.texParameteri(t, Rt.TEXTURE_MIN_FILTER, at(e.minFilter)), e.minFilter !== i.NearestFilter && e.minFilter !== i.LinearFilter && i.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + e.sourceFile + " )")), n = te.get("EXT_texture_filter_anisotropic"), n && e.type !== i.FloatType && e.type !== i.HalfFloatType && (e.anisotropy > 1 || e.__currentAnisotropy) && (Rt.texParameterf(t, n.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(e.anisotropy, Ft.getMaxAnisotropy())), e.__currentAnisotropy = e.anisotropy)
                }

                function tt(t, e) {
                    if (t.width > e || t.height > e) {
                        var r = e / Math.max(t.width, t.height),
                            n = document.createElement("canvas");
                        n.width = Math.floor(t.width * r), n.height = Math.floor(t.height * r);
                        var o = n.getContext("2d");
                        return o.drawImage(t, 0, 0, t.width, t.height, 0, 0, n.width, n.height), i.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + n.width + "x" + n.height, t), n
                    }
                    return t
                }

                function et(t, e) {
                    if (6 === t.image.length)
                        if (t.needsUpdate) {
                            t.image.__webglTextureCube || (t.addEventListener("dispose", we), t.image.__webglTextureCube = Rt.createTexture(), Ft.info.memory.textures++), Rt.activeTexture(Rt.TEXTURE0 + e), Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, t.image.__webglTextureCube), Rt.pixelStorei(Rt.UNPACK_FLIP_Y_WEBGL, t.flipY);
                            for (var r = t instanceof i.CompressedTexture, n = t.image[0] instanceof i.DataTexture, o = [], a = 0; a < 6; a++) !Ft.autoScaleCubemaps || r || n ? o[a] = n ? t.image[a].image : t.image[a] : o[a] = tt(t.image[a], se);
                            var s = o[0],
                                h = i.Math.isPowerOfTwo(s.width) && i.Math.isPowerOfTwo(s.height),
                                l = st(t.format),
                                c = st(t.type);
                            J(Rt.TEXTURE_CUBE_MAP, t, h);
                            for (var a = 0; a < 6; a++)
                                if (r)
                                    for (var u, f = o[a].mipmaps, p = 0, d = f.length; p < d; p++) u = f[p], t.format !== i.RGBAFormat && t.format !== i.RGBFormat ? de().indexOf(l) > -1 ? Rt.compressedTexImage2D(Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, u.data) : i.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : Rt.texImage2D(Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, l, c, u.data);
                                else n ? Rt.texImage2D(Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, o[a].width, o[a].height, 0, l, c, o[a].data) : Rt.texImage2D(Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, l, c, o[a]);
                            t.generateMipmaps && h && Rt.generateMipmap(Rt.TEXTURE_CUBE_MAP), t.needsUpdate = !1, t.onUpdate && t.onUpdate()
                        } else Rt.activeTexture(Rt.TEXTURE0 + e), Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, t.image.__webglTextureCube)
                }

                function rt(t, e) {
                    Rt.activeTexture(Rt.TEXTURE0 + e), Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, t.__webglTexture)
                }

                function it(t, e, r) {
                    Rt.bindFramebuffer(Rt.FRAMEBUFFER, t), Rt.framebufferTexture2D(Rt.FRAMEBUFFER, Rt.COLOR_ATTACHMENT0, r, e.__webglTexture, 0)
                }

                function nt(t, e) {
                    Rt.bindRenderbuffer(Rt.RENDERBUFFER, t), e.depthBuffer && !e.stencilBuffer ? (Rt.renderbufferStorage(Rt.RENDERBUFFER, Rt.DEPTH_COMPONENT16, e.width, e.height), Rt.framebufferRenderbuffer(Rt.FRAMEBUFFER, Rt.DEPTH_ATTACHMENT, Rt.RENDERBUFFER, t)) : e.depthBuffer && e.stencilBuffer ? (Rt.renderbufferStorage(Rt.RENDERBUFFER, Rt.DEPTH_STENCIL, e.width, e.height), Rt.framebufferRenderbuffer(Rt.FRAMEBUFFER, Rt.DEPTH_STENCIL_ATTACHMENT, Rt.RENDERBUFFER, t)) : Rt.renderbufferStorage(Rt.RENDERBUFFER, Rt.RGBA4, e.width, e.height)
                }

                function ot(t) {
                    t instanceof i.WebGLRenderTargetCube ? (Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, t.__webglTexture), Rt.generateMipmap(Rt.TEXTURE_CUBE_MAP), Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, null)) : (Rt.bindTexture(Rt.TEXTURE_2D, t.__webglTexture), Rt.generateMipmap(Rt.TEXTURE_2D), Rt.bindTexture(Rt.TEXTURE_2D, null))
                }

                function at(t) {
                    return t === i.NearestFilter || t === i.NearestMipMapNearestFilter || t === i.NearestMipMapLinearFilter ? Rt.NEAREST : Rt.LINEAR
                }

                function st(t) {
                    var e;
                    if (t === i.RepeatWrapping) return Rt.REPEAT;
                    if (t === i.ClampToEdgeWrapping) return Rt.CLAMP_TO_EDGE;
                    if (t === i.MirroredRepeatWrapping) return Rt.MIRRORED_REPEAT;
                    if (t === i.NearestFilter) return Rt.NEAREST;
                    if (t === i.NearestMipMapNearestFilter) return Rt.NEAREST_MIPMAP_NEAREST;
                    if (t === i.NearestMipMapLinearFilter) return Rt.NEAREST_MIPMAP_LINEAR;
                    if (t === i.LinearFilter) return Rt.LINEAR;
                    if (t === i.LinearMipMapNearestFilter) return Rt.LINEAR_MIPMAP_NEAREST;
                    if (t === i.LinearMipMapLinearFilter) return Rt.LINEAR_MIPMAP_LINEAR;
                    if (t === i.UnsignedByteType) return Rt.UNSIGNED_BYTE;
                    if (t === i.UnsignedShort4444Type) return Rt.UNSIGNED_SHORT_4_4_4_4;
                    if (t === i.UnsignedShort5551Type) return Rt.UNSIGNED_SHORT_5_5_5_1;
                    if (t === i.UnsignedShort565Type) return Rt.UNSIGNED_SHORT_5_6_5;
                    if (t === i.ByteType) return Rt.BYTE;
                    if (t === i.ShortType) return Rt.SHORT;
                    if (t === i.UnsignedShortType) return Rt.UNSIGNED_SHORT;
                    if (t === i.IntType) return Rt.INT;
                    if (t === i.UnsignedIntType) return Rt.UNSIGNED_INT;
                    if (t === i.FloatType) return Rt.FLOAT;
                    if (e = te.get("OES_texture_half_float"), null !== e && t === i.HalfFloatType) return e.HALF_FLOAT_OES;
                    if (t === i.AlphaFormat) return Rt.ALPHA;
                    if (t === i.RGBFormat) return Rt.RGB;
                    if (t === i.RGBAFormat) return Rt.RGBA;
                    if (t === i.LuminanceFormat) return Rt.LUMINANCE;
                    if (t === i.LuminanceAlphaFormat) return Rt.LUMINANCE_ALPHA;
                    if (t === i.AddEquation) return Rt.FUNC_ADD;
                    if (t === i.SubtractEquation) return Rt.FUNC_SUBTRACT;
                    if (t === i.ReverseSubtractEquation) return Rt.FUNC_REVERSE_SUBTRACT;
                    if (t === i.ZeroFactor) return Rt.ZERO;
                    if (t === i.OneFactor) return Rt.ONE;
                    if (t === i.SrcColorFactor) return Rt.SRC_COLOR;
                    if (t === i.OneMinusSrcColorFactor) return Rt.ONE_MINUS_SRC_COLOR;
                    if (t === i.SrcAlphaFactor) return Rt.SRC_ALPHA;
                    if (t === i.OneMinusSrcAlphaFactor) return Rt.ONE_MINUS_SRC_ALPHA;
                    if (t === i.DstAlphaFactor) return Rt.DST_ALPHA;
                    if (t === i.OneMinusDstAlphaFactor) return Rt.ONE_MINUS_DST_ALPHA;
                    if (t === i.DstColorFactor) return Rt.DST_COLOR;
                    if (t === i.OneMinusDstColorFactor) return Rt.ONE_MINUS_DST_COLOR;
                    if (t === i.SrcAlphaSaturateFactor) return Rt.SRC_ALPHA_SATURATE;
                    if (e = te.get("WEBGL_compressed_texture_s3tc"), null !== e) {
                        if (t === i.RGB_S3TC_DXT1_Format) return e.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (t === i.RGBA_S3TC_DXT1_Format) return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (t === i.RGBA_S3TC_DXT3_Format) return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (t === i.RGBA_S3TC_DXT5_Format) return e.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                    if (e = te.get("WEBGL_compressed_texture_pvrtc"), null !== e) {
                        if (t === i.RGB_PVRTC_4BPPV1_Format) return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (t === i.RGB_PVRTC_2BPPV1_Format) return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (t === i.RGBA_PVRTC_4BPPV1_Format) return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (t === i.RGBA_PVRTC_2BPPV1_Format) return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                    }
                    if (e = te.get("EXT_blend_minmax"), null !== e) {
                        if (t === i.MinEquation) return e.MIN_EXT;
                        if (t === i.MaxEquation) return e.MAX_EXT
                    }
                    return 0
                }

                function ht(t) {
                    if (le && t && t.skeleton && t.skeleton.useVertexTexture) return 1024;
                    var e = Rt.getParameter(Rt.MAX_VERTEX_UNIFORM_VECTORS),
                        r = Math.floor((e - 20) / 4),
                        n = r;
                    return void 0 !== t && t instanceof i.SkinnedMesh && (n = Math.min(t.skeleton.bones.length, n), n < t.skeleton.bones.length && i.warn("WebGLRenderer: too many bones - " + t.skeleton.bones.length + ", this GPU supports just " + n + " (try OpenGL instead of ANGLE)")), n
                }

                function lt(t) {
                    for (var e = 0, r = 0, n = 0, o = 0, a = 0, s = t.length; a < s; a++) {
                        var h = t[a];
                        h.onlyShadow || h.visible === !1 || (h instanceof i.DirectionalLight && e++, h instanceof i.PointLight && r++, h instanceof i.SpotLight && n++, h instanceof i.HemisphereLight && o++)
                    }
                    return {
                        directional: e,
                        point: r,
                        spot: n,
                        hemi: o
                    }
                }

                function ct(t) {
                    for (var e = 0, r = 0, n = t.length; r < n; r++) {
                        var o = t[r];
                        o.castShadow && (o instanceof i.SpotLight && e++, o instanceof i.DirectionalLight && !o.shadowCascade && e++)
                    }
                    return e
                }
                console.log("THREE.WebGLRenderer", i.REVISION), t = t || {};
                var ut = void 0 !== t.canvas ? t.canvas : document.createElement("canvas"),
                    ft = void 0 !== t.context ? t.context : null,
                    pt = 1,
                    dt = void 0 !== t.precision ? t.precision : "highp",
                    mt = void 0 !== t.alpha && t.alpha,
                    gt = void 0 === t.depth || t.depth,
                    vt = void 0 === t.stencil || t.stencil,
                    yt = void 0 !== t.antialias && t.antialias,
                    xt = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
                    bt = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
                    _t = void 0 !== t.logarithmicDepthBuffer && t.logarithmicDepthBuffer,
                    wt = new i.Color(0),
                    Mt = 0,
                    St = [],
                    Tt = {},
                    Et = [],
                    Ct = [],
                    At = [],
                    Lt = [],
                    Pt = [];
                this.domElement = ut, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.shadowMapEnabled = !1, this.shadowMapType = i.PCFShadowMap, this.shadowMapCullFace = i.CullFaceFront, this.shadowMapDebug = !1, this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.info = {
                    memory: {
                        programs: 0,
                        geometries: 0,
                        textures: 0
                    },
                    render: {
                        calls: 0,
                        vertices: 0,
                        faces: 0,
                        points: 0
                    }
                };
                var Rt, Ft = this,
                    Dt = [],
                    Bt = null,
                    Ut = null,
                    Vt = -1,
                    Ot = "",
                    zt = null,
                    kt = 0,
                    Nt = 0,
                    It = 0,
                    Gt = ut.width,
                    Ht = ut.height,
                    Wt = 0,
                    jt = 0,
                    Xt = new i.Frustum,
                    qt = new i.Matrix4,
                    Yt = new i.Vector3,
                    Kt = new i.Vector3,
                    Qt = !0,
                    Zt = {
                        ambient: [0, 0, 0],
                        directional: {
                            length: 0,
                            colors: [],
                            positions: []
                        },
                        point: {
                            length: 0,
                            colors: [],
                            positions: [],
                            distances: [],
                            decays: []
                        },
                        spot: {
                            length: 0,
                            colors: [],
                            positions: [],
                            distances: [],
                            directions: [],
                            anglesCos: [],
                            exponents: [],
                            decays: []
                        },
                        hemi: {
                            length: 0,
                            skyColors: [],
                            groundColors: [],
                            positions: []
                        }
                    };
                try {
                    var $t = {
                        alpha: mt,
                        depth: gt,
                        stencil: vt,
                        antialias: yt,
                        premultipliedAlpha: xt,
                        preserveDrawingBuffer: bt
                    };
                    if (Rt = ft || ut.getContext("webgl", $t) || ut.getContext("experimental-webgl", $t), null === Rt) throw null !== ut.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
                    ut.addEventListener("webglcontextlost", function(t) {
                        t.preventDefault(), ie(), re(), Tt = {}
                    }, !1)
                } catch (t) {
                    i.error("THREE.WebGLRenderer: " + t)
                }
                var Jt = new i.WebGLState(Rt, st);
                void 0 === Rt.getShaderPrecisionFormat && (Rt.getShaderPrecisionFormat = function() {
                    return {
                        rangeMin: 1,
                        rangeMax: 1,
                        precision: 1
                    }
                });
                var te = new i.WebGLExtensions(Rt);
                te.get("OES_texture_float"), te.get("OES_texture_float_linear"), te.get("OES_texture_half_float"), te.get("OES_texture_half_float_linear"), te.get("OES_standard_derivatives"), _t && te.get("EXT_frag_depth");
                var ee = function(t, e, r, i) {
                        xt === !0 && (t *= i, e *= i, r *= i), Rt.clearColor(t, e, r, i)
                    },
                    re = function() {
                        Rt.clearColor(0, 0, 0, 1), Rt.clearDepth(1), Rt.clearStencil(0), Rt.enable(Rt.DEPTH_TEST), Rt.depthFunc(Rt.LEQUAL), Rt.frontFace(Rt.CCW), Rt.cullFace(Rt.BACK), Rt.enable(Rt.CULL_FACE), Rt.enable(Rt.BLEND), Rt.blendEquation(Rt.FUNC_ADD), Rt.blendFunc(Rt.SRC_ALPHA, Rt.ONE_MINUS_SRC_ALPHA), Rt.viewport(Nt, It, Gt, Ht), ee(wt.r, wt.g, wt.b, Mt)
                    },
                    ie = function() {
                        Bt = null, zt = null, Ot = "", Vt = -1, Qt = !0, Jt.reset()
                    };
                re(), this.context = Rt, this.state = Jt;
                var ne = Rt.getParameter(Rt.MAX_TEXTURE_IMAGE_UNITS),
                    oe = Rt.getParameter(Rt.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                    ae = Rt.getParameter(Rt.MAX_TEXTURE_SIZE),
                    se = Rt.getParameter(Rt.MAX_CUBE_MAP_TEXTURE_SIZE),
                    he = oe > 0,
                    le = he && te.get("OES_texture_float"),
                    ce = Rt.getShaderPrecisionFormat(Rt.VERTEX_SHADER, Rt.HIGH_FLOAT),
                    ue = Rt.getShaderPrecisionFormat(Rt.VERTEX_SHADER, Rt.MEDIUM_FLOAT),
                    fe = Rt.getShaderPrecisionFormat(Rt.FRAGMENT_SHADER, Rt.HIGH_FLOAT),
                    pe = Rt.getShaderPrecisionFormat(Rt.FRAGMENT_SHADER, Rt.MEDIUM_FLOAT),
                    de = function() {
                        var t;
                        return function() {
                            if (void 0 !== t) return t;
                            if (t = [], te.get("WEBGL_compressed_texture_pvrtc") || te.get("WEBGL_compressed_texture_s3tc"))
                                for (var e = Rt.getParameter(Rt.COMPRESSED_TEXTURE_FORMATS), r = 0; r < e.length; r++) t.push(e[r]);
                            return t
                        }
                    }(),
                    me = ce.precision > 0 && fe.precision > 0,
                    ge = ue.precision > 0 && pe.precision > 0;
                "highp" !== dt || me || (ge ? (dt = "mediump", i.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (dt = "lowp", i.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))), "mediump" !== dt || ge || (dt = "lowp", i.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
                var ve = new i.ShadowMapPlugin(this, St, Tt, Et),
                    ye = new i.SpritePlugin(this, Lt),
                    xe = new i.LensFlarePlugin(this, Pt);
                this.getContext = function() {
                    return Rt
                }, this.forceContextLoss = function() {
                    te.get("WEBGL_lose_context").loseContext()
                }, this.supportsVertexTextures = function() {
                    return he
                }, this.supportsFloatTextures = function() {
                    return te.get("OES_texture_float")
                }, this.supportsHalfFloatTextures = function() {
                    return te.get("OES_texture_half_float")
                }, this.supportsStandardDerivatives = function() {
                    return te.get("OES_standard_derivatives")
                }, this.supportsCompressedTextureS3TC = function() {
                    return te.get("WEBGL_compressed_texture_s3tc")
                }, this.supportsCompressedTexturePVRTC = function() {
                    return te.get("WEBGL_compressed_texture_pvrtc")
                }, this.supportsBlendMinMax = function() {
                    return te.get("EXT_blend_minmax")
                }, this.getMaxAnisotropy = function() {
                    var t;
                    return function() {
                        if (void 0 !== t) return t;
                        var e = te.get("EXT_texture_filter_anisotropic");
                        return t = null !== e ? Rt.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
                    }
                }(), this.getPrecision = function() {
                    return dt
                }, this.getPixelRatio = function() {
                    return pt
                }, this.setPixelRatio = function(t) {
                    pt = t
                }, this.setSize = function(t, e, r) {
                    ut.width = t * pt, ut.height = e * pt, r !== !1 && (ut.style.width = t + "px", ut.style.height = e + "px"), this.setViewport(0, 0, t, e)
                }, this.setViewport = function(t, e, r, i) {
                    Nt = t * pt, It = e * pt, Gt = r * pt, Ht = i * pt, Rt.viewport(Nt, It, Gt, Ht)
                }, this.setScissor = function(t, e, r, i) {
                    Rt.scissor(t * pt, e * pt, r * pt, i * pt)
                }, this.enableScissorTest = function(t) {
                    t ? Rt.enable(Rt.SCISSOR_TEST) : Rt.disable(Rt.SCISSOR_TEST)
                }, this.getClearColor = function() {
                    return wt
                }, this.setClearColor = function(t, e) {
                    wt.set(t), Mt = void 0 !== e ? e : 1, ee(wt.r, wt.g, wt.b, Mt)
                }, this.getClearAlpha = function() {
                    return Mt
                }, this.setClearAlpha = function(t) {
                    Mt = t, ee(wt.r, wt.g, wt.b, Mt)
                }, this.clear = function(t, e, r) {
                    var i = 0;
                    (void 0 === t || t) && (i |= Rt.COLOR_BUFFER_BIT), (void 0 === e || e) && (i |= Rt.DEPTH_BUFFER_BIT), (void 0 === r || r) && (i |= Rt.STENCIL_BUFFER_BIT), Rt.clear(i)
                }, this.clearColor = function() {
                    Rt.clear(Rt.COLOR_BUFFER_BIT)
                }, this.clearDepth = function() {
                    Rt.clear(Rt.DEPTH_BUFFER_BIT)
                }, this.clearStencil = function() {
                    Rt.clear(Rt.STENCIL_BUFFER_BIT)
                }, this.clearTarget = function(t, e, r, i) {
                    this.setRenderTarget(t), this.clear(e, r, i)
                }, this.resetGLState = ie;
                var be = function(t) {
                        var e = t.target;
                        e.traverse(function(t) {
                            t.removeEventListener("remove", be), F(t)
                        })
                    },
                    _e = function(t) {
                        var e = t.target;
                        e.removeEventListener("dispose", _e), Ee(e)
                    },
                    we = function(t) {
                        var e = t.target;
                        e.removeEventListener("dispose", we), Ce(e), Ft.info.memory.textures--
                    },
                    Me = function(t) {
                        var e = t.target;
                        e.removeEventListener("dispose", Me), Ae(e), Ft.info.memory.textures--
                    },
                    Se = function(t) {
                        var e = t.target;
                        e.removeEventListener("dispose", Se), Le(e)
                    },
                    Te = function(t) {
                        for (var e = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"], r = 0, i = e.length; r < i; r++) {
                            var n = e[r];
                            void 0 !== t[n] && (Rt.deleteBuffer(t[n]), delete t[n])
                        }
                        if (void 0 !== t.__webglCustomAttributesList) {
                            for (var n in t.__webglCustomAttributesList) Rt.deleteBuffer(t.__webglCustomAttributesList[n].buffer);
                            delete t.__webglCustomAttributesList
                        }
                        Ft.info.memory.geometries--
                    },
                    Ee = function(t) {
                        if (delete t.__webglInit, t instanceof i.BufferGeometry) {
                            for (var e in t.attributes) {
                                var r = t.attributes[e];
                                void 0 !== r.buffer && (Rt.deleteBuffer(r.buffer), delete r.buffer)
                            }
                            Ft.info.memory.geometries--
                        } else {
                            var n = Pe[t.id];
                            if (void 0 !== n) {
                                for (var o = 0, a = n.length; o < a; o++) {
                                    var s = n[o];
                                    if (void 0 !== s.numMorphTargets) {
                                        for (var h = 0, l = s.numMorphTargets; h < l; h++) Rt.deleteBuffer(s.__webglMorphTargetsBuffers[h]);
                                        delete s.__webglMorphTargetsBuffers
                                    }
                                    if (void 0 !== s.numMorphNormals) {
                                        for (var h = 0, l = s.numMorphNormals; h < l; h++) Rt.deleteBuffer(s.__webglMorphNormalsBuffers[h]);
                                        delete s.__webglMorphNormalsBuffers
                                    }
                                    Te(s)
                                }
                                delete Pe[t.id]
                            } else Te(t)
                        }
                        Ot = ""
                    },
                    Ce = function(t) {
                        if (t.image && t.image.__webglTextureCube) Rt.deleteTexture(t.image.__webglTextureCube), delete t.image.__webglTextureCube;
                        else {
                            if (void 0 === t.__webglInit) return;
                            Rt.deleteTexture(t.__webglTexture), delete t.__webglTexture, delete t.__webglInit
                        }
                    },
                    Ae = function(t) {
                        if (t && void 0 !== t.__webglTexture) {
                            if (Rt.deleteTexture(t.__webglTexture), delete t.__webglTexture, t instanceof i.WebGLRenderTargetCube)
                                for (var e = 0; e < 6; e++) Rt.deleteFramebuffer(t.__webglFramebuffer[e]), Rt.deleteRenderbuffer(t.__webglRenderbuffer[e]);
                            else Rt.deleteFramebuffer(t.__webglFramebuffer), Rt.deleteRenderbuffer(t.__webglRenderbuffer);
                            delete t.__webglFramebuffer, delete t.__webglRenderbuffer
                        }
                    },
                    Le = function(t) {
                        var e = t.program.program;
                        if (void 0 !== e) {
                            t.program = void 0;
                            var r, i, n, o = !1;
                            for (r = 0, i = Dt.length; r < i; r++)
                                if (n = Dt[r], n.program === e) {
                                    n.usedTimes--, 0 === n.usedTimes && (o = !0);
                                    break
                                }
                            if (o === !0) {
                                var a = [];
                                for (r = 0, i = Dt.length; r < i; r++) n = Dt[r], n.program !== e && a.push(n);
                                Dt = a, Rt.deleteProgram(e), Ft.info.memory.programs--
                            }
                        }
                    };
                this.renderBufferImmediate = function(t, e, r) {
                    if (Jt.initAttributes(), t.hasPositions && !t.__webglVertexBuffer && (t.__webglVertexBuffer = Rt.createBuffer()), t.hasNormals && !t.__webglNormalBuffer && (t.__webglNormalBuffer = Rt.createBuffer()), t.hasUvs && !t.__webglUvBuffer && (t.__webglUvBuffer = Rt.createBuffer()), t.hasColors && !t.__webglColorBuffer && (t.__webglColorBuffer = Rt.createBuffer()), t.hasPositions && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglVertexBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, t.positionArray, Rt.DYNAMIC_DRAW), Jt.enableAttribute(e.attributes.position), Rt.vertexAttribPointer(e.attributes.position, 3, Rt.FLOAT, !1, 0, 0)), t.hasNormals) {
                        if (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglNormalBuffer), r instanceof i.MeshPhongMaterial == !1 && r.shading === i.FlatShading) {
                            var n, o, a, s, h, l, c, u, f, p, d, m, g, v, y = 3 * t.count;
                            for (v = 0; v < y; v += 9) g = t.normalArray, s = g[v], c = g[v + 1], p = g[v + 2], h = g[v + 3], u = g[v + 4], d = g[v + 5], l = g[v + 6], f = g[v + 7], m = g[v + 8], n = (s + h + l) / 3, o = (c + u + f) / 3, a = (p + d + m) / 3, g[v] = n, g[v + 1] = o, g[v + 2] = a, g[v + 3] = n, g[v + 4] = o, g[v + 5] = a, g[v + 6] = n, g[v + 7] = o, g[v + 8] = a
                        }
                        Rt.bufferData(Rt.ARRAY_BUFFER, t.normalArray, Rt.DYNAMIC_DRAW), Jt.enableAttribute(e.attributes.normal), Rt.vertexAttribPointer(e.attributes.normal, 3, Rt.FLOAT, !1, 0, 0)
                    }
                    t.hasUvs && r.map && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglUvBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, t.uvArray, Rt.DYNAMIC_DRAW), Jt.enableAttribute(e.attributes.uv), Rt.vertexAttribPointer(e.attributes.uv, 2, Rt.FLOAT, !1, 0, 0)), t.hasColors && r.vertexColors !== i.NoColors && (Rt.bindBuffer(Rt.ARRAY_BUFFER, t.__webglColorBuffer), Rt.bufferData(Rt.ARRAY_BUFFER, t.colorArray, Rt.DYNAMIC_DRAW), Jt.enableAttribute(e.attributes.color), Rt.vertexAttribPointer(e.attributes.color, 3, Rt.FLOAT, !1, 0, 0)), Jt.disableUnusedAttributes(), Rt.drawArrays(Rt.TRIANGLES, 0, t.count), t.count = 0
                }, this.renderBufferDirect = function(t, e, r, n, o, a) {
                    if (n.visible !== !1) {
                        L(a);
                        var s = V(t, e, r, n, a),
                            h = !1,
                            l = n.wireframe ? 1 : 0,
                            c = "direct_" + o.id + "_" + s.id + "_" + l;
                        if (c !== Ot && (Ot = c, h = !0), h && Jt.initAttributes(), a instanceof i.Mesh) {
                            var u = n.wireframe === !0 ? Rt.LINES : Rt.TRIANGLES,
                                f = o.attributes.index;
                            if (f) {
                                var p, m;
                                f.array instanceof Uint32Array && te.get("OES_element_index_uint") ? (p = Rt.UNSIGNED_INT, m = 4) : (p = Rt.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (d(n, s, o, 0), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, f.array.length, p, 0), Ft.info.render.calls++, Ft.info.render.vertices += f.array.length, Ft.info.render.faces += f.array.length / 3;
                                else {
                                    h = !0;
                                    for (var v = 0, y = g.length; v < y; v++) {
                                        var x = g[v].index;
                                        h && (d(n, s, o, x), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, g[v].count, p, g[v].start * m), Ft.info.render.calls++, Ft.info.render.vertices += g[v].count, Ft.info.render.faces += g[v].count / 3
                                    }
                                }
                            } else {
                                h && d(n, s, o, 0);
                                var b = o.attributes.position;
                                Rt.drawArrays(u, 0, b.array.length / b.itemSize), Ft.info.render.calls++, Ft.info.render.vertices += b.array.length / b.itemSize, Ft.info.render.faces += b.array.length / (3 * b.itemSize)
                            }
                        } else if (a instanceof i.PointCloud) {
                            var u = Rt.POINTS,
                                f = o.attributes.index;
                            if (f) {
                                var p, m;
                                f.array instanceof Uint32Array && te.get("OES_element_index_uint") ? (p = Rt.UNSIGNED_INT, m = 4) : (p = Rt.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (d(n, s, o, 0), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, f.array.length, p, 0), Ft.info.render.calls++, Ft.info.render.points += f.array.length;
                                else {
                                    g.length > 1 && (h = !0);
                                    for (var v = 0, y = g.length; v < y; v++) {
                                        var x = g[v].index;
                                        h && (d(n, s, o, x), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, g[v].count, p, g[v].start * m), Ft.info.render.calls++, Ft.info.render.points += g[v].count
                                    }
                                }
                            } else {
                                h && d(n, s, o, 0);
                                var b = o.attributes.position,
                                    g = o.offsets;
                                if (0 === g.length) Rt.drawArrays(u, 0, b.array.length / 3), Ft.info.render.calls++, Ft.info.render.points += b.array.length / 3;
                                else
                                    for (var v = 0, y = g.length; v < y; v++) Rt.drawArrays(u, g[v].index, g[v].count), Ft.info.render.calls++,
                                        Ft.info.render.points += g[v].count
                            }
                        } else if (a instanceof i.Line) {
                            var u = a.mode === i.LineStrip ? Rt.LINE_STRIP : Rt.LINES;
                            Jt.setLineWidth(n.linewidth * pt);
                            var f = o.attributes.index;
                            if (f) {
                                var p, m;
                                f.array instanceof Uint32Array ? (p = Rt.UNSIGNED_INT, m = 4) : (p = Rt.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (d(n, s, o, 0), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, f.array.length, p, 0), Ft.info.render.calls++, Ft.info.render.vertices += f.array.length;
                                else {
                                    g.length > 1 && (h = !0);
                                    for (var v = 0, y = g.length; v < y; v++) {
                                        var x = g[v].index;
                                        h && (d(n, s, o, x), Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, f.buffer)), Rt.drawElements(u, g[v].count, p, g[v].start * m), Ft.info.render.calls++, Ft.info.render.vertices += g[v].count
                                    }
                                }
                            } else {
                                h && d(n, s, o, 0);
                                var b = o.attributes.position,
                                    g = o.offsets;
                                if (0 === g.length) Rt.drawArrays(u, 0, b.array.length / 3), Ft.info.render.calls++, Ft.info.render.vertices += b.array.length / 3;
                                else
                                    for (var v = 0, y = g.length; v < y; v++) Rt.drawArrays(u, g[v].index, g[v].count), Ft.info.render.calls++, Ft.info.render.vertices += g[v].count
                            }
                        }
                    }
                }, this.renderBuffer = function(t, e, r, n, o, a) {
                    if (n.visible !== !1) {
                        L(a);
                        var s = V(t, e, r, n, a),
                            h = s.attributes,
                            l = !1,
                            c = n.wireframe ? 1 : 0,
                            u = o.id + "_" + s.id + "_" + c;
                        if (u !== Ot && (Ot = u, l = !0), l && Jt.initAttributes(), !n.morphTargets && h.position >= 0 ? l && (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglVertexBuffer), Jt.enableAttribute(h.position), Rt.vertexAttribPointer(h.position, 3, Rt.FLOAT, !1, 0, 0)) : a.morphTargetBase && m(n, o, a), l) {
                            if (o.__webglCustomAttributesList)
                                for (var f = 0, p = o.__webglCustomAttributesList.length; f < p; f++) {
                                    var d = o.__webglCustomAttributesList[f];
                                    h[d.buffer.belongsToAttribute] >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, d.buffer), Jt.enableAttribute(h[d.buffer.belongsToAttribute]), Rt.vertexAttribPointer(h[d.buffer.belongsToAttribute], d.size, Rt.FLOAT, !1, 0, 0))
                                }
                            h.color >= 0 && (a.geometry.colors.length > 0 || a.geometry.faces.length > 0 ? (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglColorBuffer), Jt.enableAttribute(h.color), Rt.vertexAttribPointer(h.color, 3, Rt.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && Rt.vertexAttrib3fv(h.color, n.defaultAttributeValues.color)), h.normal >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglNormalBuffer), Jt.enableAttribute(h.normal), Rt.vertexAttribPointer(h.normal, 3, Rt.FLOAT, !1, 0, 0)), h.tangent >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglTangentBuffer), Jt.enableAttribute(h.tangent), Rt.vertexAttribPointer(h.tangent, 4, Rt.FLOAT, !1, 0, 0)), h.uv >= 0 && (a.geometry.faceVertexUvs[0] ? (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglUVBuffer), Jt.enableAttribute(h.uv), Rt.vertexAttribPointer(h.uv, 2, Rt.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && Rt.vertexAttrib2fv(h.uv, n.defaultAttributeValues.uv)), h.uv2 >= 0 && (a.geometry.faceVertexUvs[1] ? (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglUV2Buffer), Jt.enableAttribute(h.uv2), Rt.vertexAttribPointer(h.uv2, 2, Rt.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && Rt.vertexAttrib2fv(h.uv2, n.defaultAttributeValues.uv2)), n.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglSkinIndicesBuffer), Jt.enableAttribute(h.skinIndex), Rt.vertexAttribPointer(h.skinIndex, 4, Rt.FLOAT, !1, 0, 0), Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglSkinWeightsBuffer), Jt.enableAttribute(h.skinWeight), Rt.vertexAttribPointer(h.skinWeight, 4, Rt.FLOAT, !1, 0, 0)), h.lineDistance >= 0 && (Rt.bindBuffer(Rt.ARRAY_BUFFER, o.__webglLineDistanceBuffer), Jt.enableAttribute(h.lineDistance), Rt.vertexAttribPointer(h.lineDistance, 1, Rt.FLOAT, !1, 0, 0))
                        }
                        if (Jt.disableUnusedAttributes(), a instanceof i.Mesh) {
                            var g = o.__typeArray === Uint32Array ? Rt.UNSIGNED_INT : Rt.UNSIGNED_SHORT;
                            n.wireframe ? (Jt.setLineWidth(n.wireframeLinewidth * pt), l && Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), Rt.drawElements(Rt.LINES, o.__webglLineCount, g, 0)) : (l && Rt.bindBuffer(Rt.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), Rt.drawElements(Rt.TRIANGLES, o.__webglFaceCount, g, 0)), Ft.info.render.calls++, Ft.info.render.vertices += o.__webglFaceCount, Ft.info.render.faces += o.__webglFaceCount / 3
                        } else if (a instanceof i.Line) {
                            var v = a.mode === i.LineStrip ? Rt.LINE_STRIP : Rt.LINES;
                            Jt.setLineWidth(n.linewidth * pt), Rt.drawArrays(v, 0, o.__webglLineCount), Ft.info.render.calls++
                        } else a instanceof i.PointCloud && (Rt.drawArrays(Rt.POINTS, 0, o.__webglParticleCount), Ft.info.render.calls++, Ft.info.render.points += o.__webglParticleCount)
                    }
                }, this.render = function(t, e, r, n) {
                    if (e instanceof i.Camera == !1) return void i.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                    var o = t.fog;
                    Ot = "", Vt = -1, zt = null, Qt = !0, t.autoUpdate === !0 && t.updateMatrixWorld(), void 0 === e.parent && e.updateMatrixWorld(), t.traverse(function(t) {
                        t instanceof i.SkinnedMesh && t.skeleton.update()
                    }), e.matrixWorldInverse.getInverse(e.matrixWorld), qt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), Xt.setFromMatrix(qt), St.length = 0, Ct.length = 0, At.length = 0, Lt.length = 0, Pt.length = 0, x(t), Ft.sortObjects === !0 && (Ct.sort(g), At.sort(v)), ve.render(t, e), Ft.info.render.calls = 0, Ft.info.render.vertices = 0, Ft.info.render.faces = 0, Ft.info.render.points = 0, this.setRenderTarget(r), (this.autoClear || n) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
                    for (var a = 0, s = Et.length; a < s; a++) {
                        var h = Et[a],
                            l = h.object;
                        l.visible && (Q(l, e), w(h))
                    }
                    if (t.overrideMaterial) {
                        var c = t.overrideMaterial;
                        U(c), b(Ct, e, St, o, c), b(At, e, St, o, c), _(Et, "", e, St, o, c)
                    } else Jt.setBlending(i.NoBlending), b(Ct, e, St, o, null), _(Et, "opaque", e, St, o, null), b(At, e, St, o, null), _(Et, "transparent", e, St, o, null);
                    ye.render(t, e), xe.render(t, e, Wt, jt), r && r.generateMipmaps && r.minFilter !== i.NearestFilter && r.minFilter !== i.LinearFilter && ot(r), Jt.setDepthTest(!0), Jt.setDepthWrite(!0), Jt.setColorWrite(!0)
                }, this.renderImmediateObject = function(t, e, r, i, n) {
                    var o = V(t, e, r, i, n);
                    Ot = "", Ft.setMaterialFaces(i), n.immediateRenderCallback ? n.immediateRenderCallback(o, Rt, Xt) : n.render(function(t) {
                        Ft.renderBufferImmediate(t, o, i)
                    })
                };
                var Pe = {},
                    Re = 0,
                    Fe = {
                        MeshDepthMaterial: "depth",
                        MeshNormalMaterial: "normal",
                        MeshBasicMaterial: "basic",
                        MeshLambertMaterial: "lambert",
                        MeshPhongMaterial: "phong",
                        LineBasicMaterial: "basic",
                        LineDashedMaterial: "dashed",
                        PointCloudMaterial: "particle_basic"
                    };
                this.setFaceCulling = function(t, e) {
                    t === i.CullFaceNone ? Rt.disable(Rt.CULL_FACE) : (e === i.FrontFaceDirectionCW ? Rt.frontFace(Rt.CW) : Rt.frontFace(Rt.CCW), t === i.CullFaceBack ? Rt.cullFace(Rt.BACK) : t === i.CullFaceFront ? Rt.cullFace(Rt.FRONT) : Rt.cullFace(Rt.FRONT_AND_BACK), Rt.enable(Rt.CULL_FACE))
                }, this.setMaterialFaces = function(t) {
                    Jt.setDoubleSided(t.side === i.DoubleSide), Jt.setFlipSided(t.side === i.BackSide)
                }, this.uploadTexture = function(t) {
                    void 0 === t.__webglInit && (t.__webglInit = !0, t.addEventListener("dispose", we), t.__webglTexture = Rt.createTexture(), Ft.info.memory.textures++), Rt.bindTexture(Rt.TEXTURE_2D, t.__webglTexture), Rt.pixelStorei(Rt.UNPACK_FLIP_Y_WEBGL, t.flipY), Rt.pixelStorei(Rt.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), Rt.pixelStorei(Rt.UNPACK_ALIGNMENT, t.unpackAlignment), t.image = tt(t.image, ae);
                    var e = t.image,
                        r = i.Math.isPowerOfTwo(e.width) && i.Math.isPowerOfTwo(e.height),
                        n = st(t.format),
                        o = st(t.type);
                    J(Rt.TEXTURE_2D, t, r);
                    var a, s = t.mipmaps;
                    if (t instanceof i.DataTexture)
                        if (s.length > 0 && r) {
                            for (var h = 0, l = s.length; h < l; h++) a = s[h], Rt.texImage2D(Rt.TEXTURE_2D, h, n, a.width, a.height, 0, n, o, a.data);
                            t.generateMipmaps = !1
                        } else Rt.texImage2D(Rt.TEXTURE_2D, 0, n, e.width, e.height, 0, n, o, e.data);
                    else if (t instanceof i.CompressedTexture)
                        for (var h = 0, l = s.length; h < l; h++) a = s[h], t.format !== i.RGBAFormat && t.format !== i.RGBFormat ? de().indexOf(n) > -1 ? Rt.compressedTexImage2D(Rt.TEXTURE_2D, h, n, a.width, a.height, 0, a.data) : i.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Rt.texImage2D(Rt.TEXTURE_2D, h, n, a.width, a.height, 0, n, o, a.data);
                    else if (s.length > 0 && r) {
                        for (var h = 0, l = s.length; h < l; h++) a = s[h], Rt.texImage2D(Rt.TEXTURE_2D, h, n, n, o, a);
                        t.generateMipmaps = !1
                    } else Rt.texImage2D(Rt.TEXTURE_2D, 0, n, n, o, t.image);
                    t.generateMipmaps && r && Rt.generateMipmap(Rt.TEXTURE_2D), t.needsUpdate = !1, t.onUpdate && t.onUpdate()
                }, this.setTexture = function(t, e) {
                    Rt.activeTexture(Rt.TEXTURE0 + e), t.needsUpdate ? Ft.uploadTexture(t) : Rt.bindTexture(Rt.TEXTURE_2D, t.__webglTexture)
                }, this.setRenderTarget = function(t) {
                    var e = t instanceof i.WebGLRenderTargetCube;
                    if (t && void 0 === t.__webglFramebuffer) {
                        void 0 === t.depthBuffer && (t.depthBuffer = !0), void 0 === t.stencilBuffer && (t.stencilBuffer = !0), t.addEventListener("dispose", Me), t.__webglTexture = Rt.createTexture(), Ft.info.memory.textures++;
                        var r = i.Math.isPowerOfTwo(t.width) && i.Math.isPowerOfTwo(t.height),
                            n = st(t.format),
                            o = st(t.type);
                        if (e) {
                            t.__webglFramebuffer = [], t.__webglRenderbuffer = [], Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, t.__webglTexture), J(Rt.TEXTURE_CUBE_MAP, t, r);
                            for (var a = 0; a < 6; a++) t.__webglFramebuffer[a] = Rt.createFramebuffer(), t.__webglRenderbuffer[a] = Rt.createRenderbuffer(), Rt.texImage2D(Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, n, t.width, t.height, 0, n, o, null), it(t.__webglFramebuffer[a], t, Rt.TEXTURE_CUBE_MAP_POSITIVE_X + a), nt(t.__webglRenderbuffer[a], t);
                            r && Rt.generateMipmap(Rt.TEXTURE_CUBE_MAP)
                        } else t.__webglFramebuffer = Rt.createFramebuffer(), t.shareDepthFrom ? t.__webglRenderbuffer = t.shareDepthFrom.__webglRenderbuffer : t.__webglRenderbuffer = Rt.createRenderbuffer(), Rt.bindTexture(Rt.TEXTURE_2D, t.__webglTexture), J(Rt.TEXTURE_2D, t, r), Rt.texImage2D(Rt.TEXTURE_2D, 0, n, t.width, t.height, 0, n, o, null), it(t.__webglFramebuffer, t, Rt.TEXTURE_2D), t.shareDepthFrom ? t.depthBuffer && !t.stencilBuffer ? Rt.framebufferRenderbuffer(Rt.FRAMEBUFFER, Rt.DEPTH_ATTACHMENT, Rt.RENDERBUFFER, t.__webglRenderbuffer) : t.depthBuffer && t.stencilBuffer && Rt.framebufferRenderbuffer(Rt.FRAMEBUFFER, Rt.DEPTH_STENCIL_ATTACHMENT, Rt.RENDERBUFFER, t.__webglRenderbuffer) : nt(t.__webglRenderbuffer, t), r && Rt.generateMipmap(Rt.TEXTURE_2D);
                        e ? Rt.bindTexture(Rt.TEXTURE_CUBE_MAP, null) : Rt.bindTexture(Rt.TEXTURE_2D, null), Rt.bindRenderbuffer(Rt.RENDERBUFFER, null), Rt.bindFramebuffer(Rt.FRAMEBUFFER, null)
                    }
                    var s, h, l, c, u;
                    t ? (s = e ? t.__webglFramebuffer[t.activeCubeFace] : t.__webglFramebuffer, h = t.width, l = t.height, c = 0, u = 0) : (s = null, h = Gt, l = Ht, c = Nt, u = It), s !== Ut && (Rt.bindFramebuffer(Rt.FRAMEBUFFER, s), Rt.viewport(c, u, h, l), Ut = s), Wt = h, jt = l
                }, this.readRenderTargetPixels = function(t, e, r, n, o, a) {
                    if (!(t instanceof i.WebGLRenderTarget)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                    if (t.__webglFramebuffer) {
                        if (t.format !== i.RGBAFormat) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
                        var s = !1;
                        t.__webglFramebuffer !== Ut && (Rt.bindFramebuffer(Rt.FRAMEBUFFER, t.__webglFramebuffer), s = !0), Rt.checkFramebufferStatus(Rt.FRAMEBUFFER) === Rt.FRAMEBUFFER_COMPLETE ? Rt.readPixels(e, r, n, o, Rt.RGBA, Rt.UNSIGNED_BYTE, a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."), s && Rt.bindFramebuffer(Rt.FRAMEBUFFER, Ut)
                    }
                }, this.initMaterial = function() {
                    i.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
                }, this.addPrePlugin = function() {
                    i.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
                }, this.addPostPlugin = function() {
                    i.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
                }, this.updateShadowMap = function() {
                    i.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
                }
            }, i.WebGLRenderTarget = function(t, e, r) {
                this.width = t, this.height = e, r = r || {}, this.wrapS = void 0 !== r.wrapS ? r.wrapS : i.ClampToEdgeWrapping, this.wrapT = void 0 !== r.wrapT ? r.wrapT : i.ClampToEdgeWrapping, this.magFilter = void 0 !== r.magFilter ? r.magFilter : i.LinearFilter, this.minFilter = void 0 !== r.minFilter ? r.minFilter : i.LinearMipMapLinearFilter, this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, this.offset = new i.Vector2(0, 0), this.repeat = new i.Vector2(1, 1), this.format = void 0 !== r.format ? r.format : i.RGBAFormat, this.type = void 0 !== r.type ? r.type : i.UnsignedByteType, this.depthBuffer = void 0 === r.depthBuffer || r.depthBuffer, this.stencilBuffer = void 0 === r.stencilBuffer || r.stencilBuffer, this.generateMipmaps = !0, this.shareDepthFrom = void 0 !== r.shareDepthFrom ? r.shareDepthFrom : null
            }, i.WebGLRenderTarget.prototype = {
                constructor: i.WebGLRenderTarget,
                setSize: function(t, e) {
                    this.width = t, this.height = e
                },
                clone: function() {
                    var t = new i.WebGLRenderTarget(this.width, this.height);
                    return t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.anisotropy = this.anisotropy, t.offset.copy(this.offset), t.repeat.copy(this.repeat), t.format = this.format, t.type = this.type, t.depthBuffer = this.depthBuffer, t.stencilBuffer = this.stencilBuffer, t.generateMipmaps = this.generateMipmaps, t.shareDepthFrom = this.shareDepthFrom, t
                },
                dispose: function() {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, i.EventDispatcher.prototype.apply(i.WebGLRenderTarget.prototype), i.WebGLRenderTargetCube = function(t, e, r) {
                i.WebGLRenderTarget.call(this, t, e, r), this.activeCubeFace = 0
            }, i.WebGLRenderTargetCube.prototype = Object.create(i.WebGLRenderTarget.prototype), i.WebGLRenderTargetCube.prototype.constructor = i.WebGLRenderTargetCube, i.WebGLExtensions = function(t) {
                var e = {};
                this.get = function(r) {
                    if (void 0 !== e[r]) return e[r];
                    var n;
                    switch (r) {
                        case "EXT_texture_filter_anisotropic":
                            n = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                            break;
                        case "WEBGL_compressed_texture_s3tc":
                            n = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                            break;
                        case "WEBGL_compressed_texture_pvrtc":
                            n = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                            break;
                        default:
                            n = t.getExtension(r)
                    }
                    return null === n && i.warn("THREE.WebGLRenderer: " + r + " extension not supported."), e[r] = n, n
                }
            }, i.WebGLProgram = function() {
                var t = 0,
                    e = function(t) {
                        var e, r, i = [];
                        for (var n in t) e = t[n], e !== !1 && (r = "#define " + n + " " + e, i.push(r));
                        return i.join("\n")
                    },
                    r = function(t, e, r) {
                        for (var i = {}, n = 0, o = r.length; n < o; n++) {
                            var a = r[n];
                            i[a] = t.getUniformLocation(e, a)
                        }
                        return i
                    },
                    n = function(t, e, r) {
                        for (var i = {}, n = 0, o = r.length; n < o; n++) {
                            var a = r[n];
                            i[a] = t.getAttribLocation(e, a)
                        }
                        return i
                    };
                return function(o, a, s, h) {
                    var l = o,
                        c = l.context,
                        u = s.defines,
                        f = s.__webglShader.uniforms,
                        p = s.attributes,
                        d = s.__webglShader.vertexShader,
                        m = s.__webglShader.fragmentShader,
                        g = s.index0AttributeName;
                    void 0 === g && h.morphTargets === !0 && (g = "position");
                    var v = "SHADOWMAP_TYPE_BASIC";
                    h.shadowMapType === i.PCFShadowMap ? v = "SHADOWMAP_TYPE_PCF" : h.shadowMapType === i.PCFSoftShadowMap && (v = "SHADOWMAP_TYPE_PCF_SOFT");
                    var y = "ENVMAP_TYPE_CUBE",
                        x = "ENVMAP_MODE_REFLECTION",
                        b = "ENVMAP_BLENDING_MULTIPLY";
                    if (h.envMap) {
                        switch (s.envMap.mapping) {
                            case i.CubeReflectionMapping:
                            case i.CubeRefractionMapping:
                                y = "ENVMAP_TYPE_CUBE";
                                break;
                            case i.EquirectangularReflectionMapping:
                            case i.EquirectangularRefractionMapping:
                                y = "ENVMAP_TYPE_EQUIREC";
                                break;
                            case i.SphericalReflectionMapping:
                                y = "ENVMAP_TYPE_SPHERE"
                        }
                        switch (s.envMap.mapping) {
                            case i.CubeRefractionMapping:
                            case i.EquirectangularRefractionMapping:
                                x = "ENVMAP_MODE_REFRACTION"
                        }
                        switch (s.combine) {
                            case i.MultiplyOperation:
                                b = "ENVMAP_BLENDING_MULTIPLY";
                                break;
                            case i.MixOperation:
                                b = "ENVMAP_BLENDING_MIX";
                                break;
                            case i.AddOperation:
                                b = "ENVMAP_BLENDING_ADD"
                        }
                    }
                    var _, w, M = o.gammaFactor > 0 ? o.gammaFactor : 1,
                        S = e(u),
                        T = c.createProgram();
                    s instanceof i.RawShaderMaterial ? (_ = "", w = "") : (_ = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", S, h.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + M, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, "#define MAX_BONES " + h.maxBones, h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + x : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.skinning ? "#define USE_SKINNING" : "", h.useVertexTexture ? "#define BONE_TEXTURE" : "", h.morphTargets ? "#define USE_MORPHTARGETS" : "", h.morphNormals ? "#define USE_MORPHNORMALS" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + v : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", ""].join("\n"), w = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", h.bumpMap || h.normalMap || h.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", S, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, h.alphaTest ? "#define ALPHATEST " + h.alphaTest : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + M, h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + y : "", h.envMap ? "#define " + x : "", h.envMap ? "#define " + b : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.metal ? "#define METAL" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + v : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n"));
                    var E = new i.WebGLShader(c, c.VERTEX_SHADER, _ + d),
                        C = new i.WebGLShader(c, c.FRAGMENT_SHADER, w + m);
                    c.attachShader(T, E), c.attachShader(T, C), void 0 !== g && c.bindAttribLocation(T, 0, g), c.linkProgram(T);
                    var A = c.getProgramInfoLog(T);
                    c.getProgramParameter(T, c.LINK_STATUS) === !1 && i.error("THREE.WebGLProgram: shader error: " + c.getError(), "gl.VALIDATE_STATUS", c.getProgramParameter(T, c.VALIDATE_STATUS), "gl.getPRogramInfoLog", A), "" !== A && i.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + A), c.deleteShader(E), c.deleteShader(C);
                    var L = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
                    h.useVertexTexture ? (L.push("boneTexture"), L.push("boneTextureWidth"), L.push("boneTextureHeight")) : L.push("boneGlobalMatrices"), h.logarithmicDepthBuffer && L.push("logDepthBufFC");
                    for (var P in f) L.push(P);
                    this.uniforms = r(c, T, L), L = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
                    for (var R = 0; R < h.maxMorphTargets; R++) L.push("morphTarget" + R);
                    for (var R = 0; R < h.maxMorphNormals; R++) L.push("morphNormal" + R);
                    for (var F in p) L.push(F);
                    return this.attributes = n(c, T, L), this.attributesKeys = Object.keys(this.attributes), this.id = t++, this.code = a, this.usedTimes = 1, this.program = T, this.vertexShader = E, this.fragmentShader = C, this
                }
            }(), i.WebGLShader = function() {
                var t = function(t) {
                    for (var e = t.split("\n"), r = 0; r < e.length; r++) e[r] = r + 1 + ": " + e[r];
                    return e.join("\n")
                };
                return function(e, r, n) {
                    var o = e.createShader(r);
                    return e.shaderSource(o, n), e.compileShader(o), e.getShaderParameter(o, e.COMPILE_STATUS) === !1 && i.error("THREE.WebGLShader: Shader couldn't compile."), "" !== e.getShaderInfoLog(o) && i.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e.getShaderInfoLog(o), t(n)), o
                }
            }(), i.WebGLState = function(t, e) {
                var r = new Uint8Array(16),
                    n = new Uint8Array(16),
                    o = null,
                    a = null,
                    s = null,
                    h = null,
                    l = null,
                    c = null,
                    u = null,
                    f = null,
                    p = null,
                    d = null,
                    m = null,
                    g = null,
                    v = null,
                    y = null,
                    x = null,
                    b = null;
                this.initAttributes = function() {
                    for (var t = 0, e = r.length; t < e; t++) r[t] = 0
                }, this.enableAttribute = function(e) {
                    r[e] = 1, 0 === n[e] && (t.enableVertexAttribArray(e), n[e] = 1)
                }, this.disableUnusedAttributes = function() {
                    for (var e = 0, i = n.length; e < i; e++) n[e] !== r[e] && (t.disableVertexAttribArray(e), n[e] = 0)
                }, this.setBlending = function(r, n, f, p, d, m, g) {
                    r !== o && (r === i.NoBlending ? t.disable(t.BLEND) : r === i.AdditiveBlending ? (t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE)) : r === i.SubtractiveBlending ? (t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR)) : r === i.MultiplyBlending ? (t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.SRC_COLOR)) : r === i.CustomBlending ? t.enable(t.BLEND) : (t.enable(t.BLEND), t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)), o = r), r === i.CustomBlending ? (d = d || n, m = m || f, g = g || p, n === a && d === l || (t.blendEquationSeparate(e(n), e(d)), a = n, l = d), f === s && p === h && m === c && g === u || (t.blendFuncSeparate(e(f), e(p), e(m), e(g)), s = f, h = p, c = m, u = g)) : (a = null, s = null, h = null, l = null, c = null, u = null)
                }, this.setDepthTest = function(e) {
                    f !== e && (e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST), f = e)
                }, this.setDepthWrite = function(e) {
                    p !== e && (t.depthMask(e), p = e)
                }, this.setColorWrite = function(e) {
                    d !== e && (t.colorMask(e, e, e, e), d = e)
                }, this.setDoubleSided = function(e) {
                    m !== e && (e ? t.disable(t.CULL_FACE) : t.enable(t.CULL_FACE), m = e)
                }, this.setFlipSided = function(e) {
                    g !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), g = e)
                }, this.setLineWidth = function(e) {
                    e !== v && (t.lineWidth(e), v = e)
                }, this.setPolygonOffset = function(e, r, i) {
                    y !== e && (e ? t.enable(t.POLYGON_OFFSET_FILL) : t.disable(t.POLYGON_OFFSET_FILL), y = e), !e || x === r && b === i || (t.polygonOffset(r, i), x = r, b = i)
                }, this.reset = function() {
                    for (var t = 0; t < n.length; t++) n[t] = 0;
                    o = null, f = null, p = null, d = null, m = null, g = null
                }
            }, i.LensFlarePlugin = function(t, e) {
                function r(e) {
                    var r = f.createProgram(),
                        i = f.createShader(f.FRAGMENT_SHADER),
                        n = f.createShader(f.VERTEX_SHADER),
                        o = "precision " + t.getPrecision() + " float;\n";
                    return f.shaderSource(i, o + e.fragmentShader), f.shaderSource(n, o + e.vertexShader), f.compileShader(i), f.compileShader(n), f.attachShader(r, i), f.attachShader(r, n), f.linkProgram(r), r
                }
                var n, o, a, s, h, l, c, u, f = t.context,
                    p = function() {
                        var t = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                            e = new Uint16Array([0, 1, 2, 0, 2, 3]);
                        n = f.createBuffer(), o = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, n), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), c = f.createTexture(), u = f.createTexture(), f.bindTexture(f.TEXTURE_2D, c), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), f.bindTexture(f.TEXTURE_2D, u), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), l = f.getParameter(f.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
                        var i;
                        i = l ? {
                            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                            fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                        } : {
                            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                            fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                        }, a = r(i), s = {
                            vertex: f.getAttribLocation(a, "position"),
                            uv: f.getAttribLocation(a, "uv")
                        }, h = {
                            renderType: f.getUniformLocation(a, "renderType"),
                            map: f.getUniformLocation(a, "map"),
                            occlusionMap: f.getUniformLocation(a, "occlusionMap"),
                            opacity: f.getUniformLocation(a, "opacity"),
                            color: f.getUniformLocation(a, "color"),
                            scale: f.getUniformLocation(a, "scale"),
                            rotation: f.getUniformLocation(a, "rotation"),
                            screenPosition: f.getUniformLocation(a, "screenPosition")
                        }
                    };
                this.render = function(r, d, m, g) {
                    if (0 !== e.length) {
                        var v = new i.Vector3,
                            y = g / m,
                            x = .5 * m,
                            b = .5 * g,
                            _ = 16 / g,
                            w = new i.Vector2(_ * y, _),
                            M = new i.Vector3(1, 1, 0),
                            S = new i.Vector2(1, 1);
                        void 0 === a && p(), f.useProgram(a), f.enableVertexAttribArray(s.vertex), f.enableVertexAttribArray(s.uv), f.uniform1i(h.occlusionMap, 0), f.uniform1i(h.map, 1), f.bindBuffer(f.ARRAY_BUFFER, n), f.vertexAttribPointer(s.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(s.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, o), f.disable(f.CULL_FACE), f.depthMask(!1);
                        for (var T = 0, E = e.length; T < E; T++) {
                            _ = 16 / g, w.set(_ * y, _);
                            var C = e[T];
                            if (v.set(C.matrixWorld.elements[12], C.matrixWorld.elements[13], C.matrixWorld.elements[14]), v.applyMatrix4(d.matrixWorldInverse), v.applyProjection(d.projectionMatrix), M.copy(v), S.x = M.x * x + x, S.y = M.y * b + b, l || S.x > 0 && S.x < m && S.y > 0 && S.y < g) {
                                f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, c), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 0), f.uniform2f(h.scale, w.x, w.y), f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.disable(f.BLEND), f.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, u), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, S.x - 8, S.y - 8, 16, 16, 0), f.uniform1i(h.renderType, 1), f.disable(f.DEPTH_TEST), f.activeTexture(f.TEXTURE1), f.bindTexture(f.TEXTURE_2D, c), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), C.positionScreen.copy(M), C.customUpdateCallback ? C.customUpdateCallback(C) : C.updateLensFlares(), f.uniform1i(h.renderType, 2), f.enable(f.BLEND);
                                for (var A = 0, L = C.lensFlares.length; A < L; A++) {
                                    var P = C.lensFlares[A];
                                    P.opacity > .001 && P.scale > .001 && (M.x = P.x, M.y = P.y, M.z = P.z, _ = P.size * P.scale / g, w.x = _ * y, w.y = _, f.uniform3f(h.screenPosition, M.x, M.y, M.z), f.uniform2f(h.scale, w.x, w.y), f.uniform1f(h.rotation, P.rotation), f.uniform1f(h.opacity, P.opacity), f.uniform3f(h.color, P.color.r, P.color.g, P.color.b), t.state.setBlending(P.blending, P.blendEquation, P.blendSrc, P.blendDst), t.setTexture(P.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
                                }
                            }
                        }
                        f.enable(f.CULL_FACE), f.enable(f.DEPTH_TEST), f.depthMask(!0), t.resetGLState()
                    }
                }
            }, i.ShadowMapPlugin = function(t, e, r, n) {
                function o(t, e, i) {
                    if (e.visible) {
                        var n = r[e.id];
                        if (n && e.castShadow && (e.frustumCulled === !1 || m.intersectsObject(e) === !0))
                            for (var a = 0, s = n.length; a < s; a++) {
                                var h = n[a];
                                e._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld), b.push(h)
                            }
                        for (var a = 0, s = e.children.length; a < s; a++) o(t, e.children[a], i)
                    }
                }

                function a(t, e) {
                    var r = new i.DirectionalLight;
                    r.isVirtual = !0, r.onlyShadow = !0, r.castShadow = !0, r.shadowCameraNear = t.shadowCameraNear, r.shadowCameraFar = t.shadowCameraFar, r.shadowCameraLeft = t.shadowCameraLeft, r.shadowCameraRight = t.shadowCameraRight, r.shadowCameraBottom = t.shadowCameraBottom, r.shadowCameraTop = t.shadowCameraTop, r.shadowCameraVisible = t.shadowCameraVisible, r.shadowDarkness = t.shadowDarkness, r.shadowBias = t.shadowCascadeBias[e], r.shadowMapWidth = t.shadowCascadeWidth[e], r.shadowMapHeight = t.shadowCascadeHeight[e], r.pointsWorld = [], r.pointsFrustum = [];
                    for (var n = r.pointsWorld, o = r.pointsFrustum, a = 0; a < 8; a++) n[a] = new i.Vector3, o[a] = new i.Vector3;
                    var s = t.shadowCascadeNearZ[e],
                        h = t.shadowCascadeFarZ[e];
                    return o[0].set(-1, -1, s), o[1].set(1, -1, s), o[2].set(-1, 1, s), o[3].set(1, 1, s), o[4].set(-1, -1, h), o[5].set(1, -1, h), o[6].set(-1, 1, h), o[7].set(1, 1, h), r
                }

                function s(t, e) {
                    var r = t.shadowCascadeArray[e];
                    r.position.copy(t.position), r.target.position.copy(t.target.position), r.lookAt(r.target), r.shadowCameraVisible = t.shadowCameraVisible, r.shadowDarkness = t.shadowDarkness, r.shadowBias = t.shadowCascadeBias[e];
                    var i = t.shadowCascadeNearZ[e],
                        n = t.shadowCascadeFarZ[e],
                        o = r.pointsFrustum;
                    o[0].z = i, o[1].z = i, o[2].z = i, o[3].z = i, o[4].z = n, o[5].z = n, o[6].z = n, o[7].z = n
                }

                function h(t, e) {
                    var r = e.shadowCamera,
                        i = e.pointsFrustum,
                        n = e.pointsWorld;
                    v.set(1 / 0, 1 / 0, 1 / 0), y.set(-(1 / 0), -(1 / 0), -(1 / 0));
                    for (var o = 0; o < 8; o++) {
                        var a = n[o];
                        a.copy(i[o]), a.unproject(t), a.applyMatrix4(r.matrixWorldInverse), a.x < v.x && (v.x = a.x), a.x > y.x && (y.x = a.x), a.y < v.y && (v.y = a.y), a.y > y.y && (y.y = a.y), a.z < v.z && (v.z = a.z), a.z > y.z && (y.z = a.z)
                    }
                    r.left = v.x, r.right = y.x, r.top = y.y, r.bottom = v.y, r.updateProjectionMatrix()
                }

                function l(t) {
                    return t.material instanceof i.MeshFaceMaterial ? t.material.materials[0] : t.material
                }
                var c, u, f, p, d = t.context,
                    m = new i.Frustum,
                    g = new i.Matrix4,
                    v = new i.Vector3,
                    y = new i.Vector3,
                    x = new i.Vector3,
                    b = [],
                    _ = i.ShaderLib.depthRGBA,
                    w = i.UniformsUtils.clone(_.uniforms);
                c = new i.ShaderMaterial({
                    uniforms: w,
                    vertexShader: _.vertexShader,
                    fragmentShader: _.fragmentShader
                }), u = new i.ShaderMaterial({
                    uniforms: w,
                    vertexShader: _.vertexShader,
                    fragmentShader: _.fragmentShader,
                    morphTargets: !0
                }), f = new i.ShaderMaterial({
                    uniforms: w,
                    vertexShader: _.vertexShader,
                    fragmentShader: _.fragmentShader,
                    skinning: !0
                }), p = new i.ShaderMaterial({
                    uniforms: w,
                    vertexShader: _.vertexShader,
                    fragmentShader: _.fragmentShader,
                    morphTargets: !0,
                    skinning: !0
                }), c._shadowPass = !0, u._shadowPass = !0, f._shadowPass = !0, p._shadowPass = !0, this.render = function(r, v) {
                    if (t.shadowMapEnabled !== !1) {
                        var y, _, w, M, S, T, E, C, A, L, P, R, F, D = [],
                            B = 0,
                            U = null;
                        for (d.clearColor(1, 1, 1, 1), d.disable(d.BLEND), d.enable(d.CULL_FACE), d.frontFace(d.CCW), t.shadowMapCullFace === i.CullFaceFront ? d.cullFace(d.FRONT) : d.cullFace(d.BACK), t.state.setDepthTest(!0), y = 0, _ = e.length; y < _; y++)
                            if (F = e[y], F.castShadow)
                                if (F instanceof i.DirectionalLight && F.shadowCascade)
                                    for (S = 0; S < F.shadowCascadeCount; S++) {
                                        var V;
                                        if (F.shadowCascadeArray[S]) V = F.shadowCascadeArray[S];
                                        else {
                                            V = a(F, S), V.originalCamera = v;
                                            var O = new i.Gyroscope;
                                            O.position.copy(F.shadowCascadeOffset), O.add(V), O.add(V.target), v.add(O), F.shadowCascadeArray[S] = V
                                        }
                                        s(F, S), D[B] = V, B++
                                    } else D[B] = F, B++;
                        for (y = 0, _ = D.length; y < _; y++) {
                            if (F = D[y], !F.shadowMap) {
                                var z = i.LinearFilter;
                                t.shadowMapType === i.PCFSoftShadowMap && (z = i.NearestFilter);
                                var k = {
                                    minFilter: z,
                                    magFilter: z,
                                    format: i.RGBAFormat
                                };
                                F.shadowMap = new i.WebGLRenderTarget(F.shadowMapWidth, F.shadowMapHeight, k), F.shadowMapSize = new i.Vector2(F.shadowMapWidth, F.shadowMapHeight), F.shadowMatrix = new i.Matrix4
                            }
                            if (!F.shadowCamera) {
                                if (F instanceof i.SpotLight) F.shadowCamera = new i.PerspectiveCamera(F.shadowCameraFov, F.shadowMapWidth / F.shadowMapHeight, F.shadowCameraNear, F.shadowCameraFar);
                                else {
                                    if (!(F instanceof i.DirectionalLight)) {
                                        i.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", F);
                                        continue
                                    }
                                    F.shadowCamera = new i.OrthographicCamera(F.shadowCameraLeft, F.shadowCameraRight, F.shadowCameraTop, F.shadowCameraBottom, F.shadowCameraNear, F.shadowCameraFar)
                                }
                                r.add(F.shadowCamera), r.autoUpdate === !0 && r.updateMatrixWorld()
                            }
                            F.shadowCameraVisible && !F.cameraHelper && (F.cameraHelper = new i.CameraHelper(F.shadowCamera), r.add(F.cameraHelper)), F.isVirtual && V.originalCamera == v && h(v, F), T = F.shadowMap, E = F.shadowMatrix, C = F.shadowCamera, C.position.setFromMatrixPosition(F.matrixWorld), x.setFromMatrixPosition(F.target.matrixWorld), C.lookAt(x), C.updateMatrixWorld(), C.matrixWorldInverse.getInverse(C.matrixWorld), F.cameraHelper && (F.cameraHelper.visible = F.shadowCameraVisible), F.shadowCameraVisible && F.cameraHelper.update(), E.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), E.multiply(C.projectionMatrix), E.multiply(C.matrixWorldInverse), g.multiplyMatrices(C.projectionMatrix, C.matrixWorldInverse), m.setFromMatrix(g), t.setRenderTarget(T), t.clear(), b.length = 0, o(r, r, C);
                            var N, I, G;
                            for (w = 0, M = b.length; w < M; w++) P = b[w], R = P.object, A = P.buffer, N = l(R), I = void 0 !== R.geometry.morphTargets && R.geometry.morphTargets.length > 0 && N.morphTargets, G = R instanceof i.SkinnedMesh && N.skinning, L = R.customDepthMaterial ? R.customDepthMaterial : G ? I ? p : f : I ? u : c, t.setMaterialFaces(N), A instanceof i.BufferGeometry ? t.renderBufferDirect(C, e, U, L, A, R) : t.renderBuffer(C, e, U, L, A, R);
                            for (w = 0, M = n.length; w < M; w++) P = n[w], R = P.object, R.visible && R.castShadow && (R._modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, R.matrixWorld), t.renderImmediateObject(C, e, U, c, R))
                        }
                        var H = t.getClearColor(),
                            W = t.getClearAlpha();
                        d.clearColor(H.r, H.g, H.b, W), d.enable(d.BLEND), t.shadowMapCullFace === i.CullFaceFront && d.cullFace(d.BACK), t.resetGLState()
                    }
                }
            }, i.SpritePlugin = function(t, e) {
                function r() {
                    var e = u.createProgram(),
                        r = u.createShader(u.VERTEX_SHADER),
                        i = u.createShader(u.FRAGMENT_SHADER);
                    return u.shaderSource(r, ["precision " + t.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), u.shaderSource(i, ["precision " + t.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), u.compileShader(r), u.compileShader(i), u.attachShader(e, r), u.attachShader(e, i), u.linkProgram(e), e
                }

                function n(t, e) {
                    return t.z !== e.z ? e.z - t.z : e.id - t.id
                }
                var o, a, s, h, l, c, u = t.context,
                    f = new i.Vector3,
                    p = new i.Quaternion,
                    d = new i.Vector3,
                    m = function() {
                        var t = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                            e = new Uint16Array([0, 1, 2, 0, 2, 3]);
                        o = u.createBuffer(), a = u.createBuffer(), u.bindBuffer(u.ARRAY_BUFFER, o), u.bufferData(u.ARRAY_BUFFER, t, u.STATIC_DRAW), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.bufferData(u.ELEMENT_ARRAY_BUFFER, e, u.STATIC_DRAW), s = r(), h = {
                            position: u.getAttribLocation(s, "position"),
                            uv: u.getAttribLocation(s, "uv")
                        }, l = {
                            uvOffset: u.getUniformLocation(s, "uvOffset"),
                            uvScale: u.getUniformLocation(s, "uvScale"),
                            rotation: u.getUniformLocation(s, "rotation"),
                            scale: u.getUniformLocation(s, "scale"),
                            color: u.getUniformLocation(s, "color"),
                            map: u.getUniformLocation(s, "map"),
                            opacity: u.getUniformLocation(s, "opacity"),
                            modelViewMatrix: u.getUniformLocation(s, "modelViewMatrix"),
                            projectionMatrix: u.getUniformLocation(s, "projectionMatrix"),
                            fogType: u.getUniformLocation(s, "fogType"),
                            fogDensity: u.getUniformLocation(s, "fogDensity"),
                            fogNear: u.getUniformLocation(s, "fogNear"),
                            fogFar: u.getUniformLocation(s, "fogFar"),
                            fogColor: u.getUniformLocation(s, "fogColor"),
                            alphaTest: u.getUniformLocation(s, "alphaTest")
                        };
                        var n = document.createElement("canvas");
                        n.width = 8, n.height = 8;
                        var f = n.getContext("2d");
                        f.fillStyle = "white", f.fillRect(0, 0, 8, 8), c = new i.Texture(n), c.needsUpdate = !0
                    };
                this.render = function(r, g) {
                    if (0 !== e.length) {
                        void 0 === s && m(), u.useProgram(s), u.enableVertexAttribArray(h.position), u.enableVertexAttribArray(h.uv), u.disable(u.CULL_FACE), u.enable(u.BLEND), u.bindBuffer(u.ARRAY_BUFFER, o), u.vertexAttribPointer(h.position, 2, u.FLOAT, !1, 16, 0), u.vertexAttribPointer(h.uv, 2, u.FLOAT, !1, 16, 8), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.uniformMatrix4fv(l.projectionMatrix, !1, g.projectionMatrix.elements), u.activeTexture(u.TEXTURE0), u.uniform1i(l.map, 0);
                        var v = 0,
                            y = 0,
                            x = r.fog;
                        x ? (u.uniform3f(l.fogColor, x.color.r, x.color.g, x.color.b), x instanceof i.Fog ? (u.uniform1f(l.fogNear, x.near), u.uniform1f(l.fogFar, x.far), u.uniform1i(l.fogType, 1), v = 1, y = 1) : x instanceof i.FogExp2 && (u.uniform1f(l.fogDensity, x.density), u.uniform1i(l.fogType, 2), v = 2, y = 2)) : (u.uniform1i(l.fogType, 0), v = 0, y = 0);
                        for (var b = 0, _ = e.length; b < _; b++) {
                            var w = e[b];
                            w._modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, w.matrixWorld), w.z = -w._modelViewMatrix.elements[14]
                        }
                        e.sort(n);
                        for (var M = [], b = 0, _ = e.length; b < _; b++) {
                            var w = e[b],
                                S = w.material;
                            u.uniform1f(l.alphaTest, S.alphaTest), u.uniformMatrix4fv(l.modelViewMatrix, !1, w._modelViewMatrix.elements), w.matrixWorld.decompose(f, p, d), M[0] = d.x, M[1] = d.y;
                            var T = 0;
                            r.fog && S.fog && (T = y), v !== T && (u.uniform1i(l.fogType, T), v = T), null !== S.map ? (u.uniform2f(l.uvOffset, S.map.offset.x, S.map.offset.y), u.uniform2f(l.uvScale, S.map.repeat.x, S.map.repeat.y)) : (u.uniform2f(l.uvOffset, 0, 0), u.uniform2f(l.uvScale, 1, 1)), u.uniform1f(l.opacity, S.opacity), u.uniform3f(l.color, S.color.r, S.color.g, S.color.b), u.uniform1f(l.rotation, S.rotation), u.uniform2fv(l.scale, M), t.state.setBlending(S.blending, S.blendEquation, S.blendSrc, S.blendDst), t.state.setDepthTest(S.depthTest), t.state.setDepthWrite(S.depthWrite), S.map && S.map.image && S.map.image.width ? t.setTexture(S.map, 0) : t.setTexture(c, 0), u.drawElements(u.TRIANGLES, 6, u.UNSIGNED_SHORT, 0)
                        }
                        u.enable(u.CULL_FACE), t.resetGLState()
                    }
                }
            }, i.GeometryUtils = {
                merge: function(t, e, r) {
                    i.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
                    var n;
                    e instanceof i.Mesh && (e.matrixAutoUpdate && e.updateMatrix(), n = e.matrix, e = e.geometry), t.merge(e, n, r)
                },
                center: function(t) {
                    return i.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), t.center()
                }
            }, i.ImageUtils = {
                crossOrigin: void 0,
                loadTexture: function(t, e, r, n) {
                    var o = new i.ImageLoader;
                    o.crossOrigin = this.crossOrigin;
                    var a = new i.Texture((void 0), e);
                    return o.load(t, function(t) {
                        a.image = t, a.needsUpdate = !0, r && r(a)
                    }, void 0, function(t) {
                        n && n(t)
                    }), a.sourceFile = t, a
                },
                loadTextureCube: function(t, e, r, n) {
                    var o = [],
                        a = new i.ImageLoader;
                    a.crossOrigin = this.crossOrigin;
                    var s = new i.CubeTexture(o, e);
                    s.flipY = !1;
                    for (var h = 0, l = function(e) {
                            a.load(t[e], function(t) {
                                s.images[e] = t, h += 1, 6 === h && (s.needsUpdate = !0, r && r(s))
                            }, void 0, n)
                        }, c = 0, u = t.length; c < u; ++c) l(c);
                    return s
                },
                loadCompressedTexture: function() {
                    i.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
                },
                loadCompressedTextureCube: function() {
                    i.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
                },
                getNormalMap: function(t, e) {
                    var r = function(t, e) {
                            return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
                        },
                        i = function(t, e) {
                            return [t[0] - e[0], t[1] - e[1], t[2] - e[2]]
                        },
                        n = function(t) {
                            var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
                            return [t[0] / e, t[1] / e, t[2] / e]
                        };
                    e = 1 | e;
                    var o = t.width,
                        a = t.height,
                        s = document.createElement("canvas");
                    s.width = o, s.height = a;
                    var h = s.getContext("2d");
                    h.drawImage(t, 0, 0);
                    for (var l = h.getImageData(0, 0, o, a).data, c = h.createImageData(o, a), u = c.data, f = 0; f < o; f++)
                        for (var p = 0; p < a; p++) {
                            var d = p - 1 < 0 ? 0 : p - 1,
                                m = p + 1 > a - 1 ? a - 1 : p + 1,
                                g = f - 1 < 0 ? 0 : f - 1,
                                v = f + 1 > o - 1 ? o - 1 : f + 1,
                                y = [],
                                x = [0, 0, l[4 * (p * o + f)] / 255 * e];
                            y.push([-1, 0, l[4 * (p * o + g)] / 255 * e]), y.push([-1, -1, l[4 * (d * o + g)] / 255 * e]), y.push([0, -1, l[4 * (d * o + f)] / 255 * e]), y.push([1, -1, l[4 * (d * o + v)] / 255 * e]), y.push([1, 0, l[4 * (p * o + v)] / 255 * e]), y.push([1, 1, l[4 * (m * o + v)] / 255 * e]), y.push([0, 1, l[4 * (m * o + f)] / 255 * e]), y.push([-1, 1, l[4 * (m * o + g)] / 255 * e]);
                            for (var b = [], _ = y.length, w = 0; w < _; w++) {
                                var M = y[w],
                                    S = y[(w + 1) % _];
                                M = i(M, x), S = i(S, x), b.push(n(r(M, S)))
                            }
                            for (var T = [0, 0, 0], w = 0; w < b.length; w++) T[0] += b[w][0], T[1] += b[w][1], T[2] += b[w][2];
                            T[0] /= b.length, T[1] /= b.length, T[2] /= b.length;
                            var E = 4 * (p * o + f);
                            u[E] = (T[0] + 1) / 2 * 255 | 0, u[E + 1] = (T[1] + 1) / 2 * 255 | 0, u[E + 2] = 255 * T[2] | 0, u[E + 3] = 255
                        }
                    return h.putImageData(c, 0, 0), s
                },
                generateDataTexture: function(t, e, r) {
                    for (var n = t * e, o = new Uint8Array(3 * n), a = Math.floor(255 * r.r), s = Math.floor(255 * r.g), h = Math.floor(255 * r.b), l = 0; l < n; l++) o[3 * l] = a, o[3 * l + 1] = s, o[3 * l + 2] = h;
                    var c = new i.DataTexture(o, t, e, i.RGBFormat);
                    return c.needsUpdate = !0, c
                }
            }, i.SceneUtils = {
                createMultiMaterialObject: function(t, e) {
                    for (var r = new i.Object3D, n = 0, o = e.length; n < o; n++) r.add(new i.Mesh(t, e[n]));
                    return r
                },
                detach: function(t, e, r) {
                    t.applyMatrix(e.matrixWorld), e.remove(t), r.add(t)
                },
                attach: function(t, e, r) {
                    var n = new i.Matrix4;
                    n.getInverse(r.matrixWorld), t.applyMatrix(n), e.remove(t), r.add(t)
                }
            }, i.FontUtils = {
                faces: {},
                face: "helvetiker",
                weight: "normal",
                style: "normal",
                size: 150,
                divisions: 10,
                getFace: function() {
                    try {
                        return this.faces[this.face][this.weight][this.style]
                    } catch (t) {
                        throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
                    }
                },
                loadFace: function(t) {
                    var e = t.familyName.toLowerCase(),
                        r = this;
                    return r.faces[e] = r.faces[e] || {}, r.faces[e][t.cssFontWeight] = r.faces[e][t.cssFontWeight] || {}, r.faces[e][t.cssFontWeight][t.cssFontStyle] = t, r.faces[e][t.cssFontWeight][t.cssFontStyle] = t, t
                },
                drawText: function(t) {
                    var e, r = this.getFace(),
                        n = this.size / r.resolution,
                        o = 0,
                        a = String(t).split(""),
                        s = a.length,
                        h = [];
                    for (e = 0; e < s; e++) {
                        var l = new i.Path,
                            c = this.extractGlyphPoints(a[e], r, n, o, l);
                        o += c.offset, h.push(c.path)
                    }
                    var u = o / 2;
                    return {
                        paths: h,
                        offset: u
                    }
                },
                extractGlyphPoints: function(t, e, r, n, o) {
                    var a, s, h, l, c, u, f, p, d, m, g, v, y, x, b, _, w, M, S, T = [],
                        E = e.glyphs[t] || e.glyphs["?"];
                    if (E) {
                        if (E.o)
                            for (l = E._cachedOutline || (E._cachedOutline = E.o.split(" ")), u = l.length, f = r, p = r, a = 0; a < u;) switch (c = l[a++]) {
                                case "m":
                                    d = l[a++] * f + n, m = l[a++] * p, o.moveTo(d, m);
                                    break;
                                case "l":
                                    d = l[a++] * f + n, m = l[a++] * p, o.lineTo(d, m);
                                    break;
                                case "q":
                                    if (g = l[a++] * f + n, v = l[a++] * p, b = l[a++] * f + n, _ = l[a++] * p, o.quadraticCurveTo(b, _, g, v), S = T[T.length - 1])
                                        for (y = S.x, x = S.y, s = 1, h = this.divisions; s <= h; s++) {
                                            var C = s / h;
                                            i.Shape.Utils.b2(C, y, b, g), i.Shape.Utils.b2(C, x, _, v)
                                        }
                                    break;
                                case "b":
                                    if (g = l[a++] * f + n, v = l[a++] * p, b = l[a++] * f + n, _ = l[a++] * p, w = l[a++] * f + n, M = l[a++] * p, o.bezierCurveTo(b, _, w, M, g, v), S = T[T.length - 1])
                                        for (y = S.x, x = S.y, s = 1, h = this.divisions; s <= h; s++) {
                                            var C = s / h;
                                            i.Shape.Utils.b3(C, y, b, w, g), i.Shape.Utils.b3(C, x, _, M, v)
                                        }
                            }
                        return {
                            offset: E.ha * r,
                            path: o
                        }
                    }
                }
            }, i.FontUtils.generateShapes = function(t, e) {
                e = e || {};
                var r = void 0 !== e.size ? e.size : 100,
                    n = void 0 !== e.curveSegments ? e.curveSegments : 4,
                    o = void 0 !== e.font ? e.font : "helvetiker",
                    a = void 0 !== e.weight ? e.weight : "normal",
                    s = void 0 !== e.style ? e.style : "normal";
                i.FontUtils.size = r, i.FontUtils.divisions = n, i.FontUtils.face = o, i.FontUtils.weight = a, i.FontUtils.style = s;
                for (var h = i.FontUtils.drawText(t), l = h.paths, c = [], u = 0, f = l.length; u < f; u++) Array.prototype.push.apply(c, l[u].toShapes());
                return c
            },
            function(t) {
                var e = 1e-10,
                    r = function(t, e) {
                        var r = t.length;
                        if (r < 3) return null;
                        var a, s, h, l = [],
                            c = [],
                            u = [];
                        if (n(t) > 0)
                            for (s = 0; s < r; s++) c[s] = s;
                        else
                            for (s = 0; s < r; s++) c[s] = r - 1 - s;
                        var f = r,
                            p = 2 * f;
                        for (s = f - 1; f > 2;) {
                            if (p-- <= 0) return i.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()"), e ? u : l;
                            if (a = s, f <= a && (a = 0), s = a + 1, f <= s && (s = 0), h = s + 1, f <= h && (h = 0), o(t, a, s, h, f, c)) {
                                var d, m, g, v, y;
                                for (d = c[a], m = c[s], g = c[h], l.push([t[d], t[m], t[g]]), u.push([c[a], c[s], c[h]]), v = s, y = s + 1; y < f; v++, y++) c[v] = c[y];
                                f--, p = 2 * f
                            }
                        }
                        return e ? u : l
                    },
                    n = function(t) {
                        for (var e = t.length, r = 0, i = e - 1, n = 0; n < e; i = n++) r += t[i].x * t[n].y - t[n].x * t[i].y;
                        return .5 * r
                    },
                    o = function(t, r, i, n, o, a) {
                        var s, h, l, c, u, f, p, d, m;
                        if (h = t[a[r]].x, l = t[a[r]].y, c = t[a[i]].x, u = t[a[i]].y, f = t[a[n]].x, p = t[a[n]].y, e > (c - h) * (p - l) - (u - l) * (f - h)) return !1;
                        var g, v, y, x, b, _, w, M, S, T, E, C, A, L, P;
                        for (g = f - c, v = p - u, y = h - f, x = l - p, b = c - h, _ = u - l, s = 0; s < o; s++)
                            if (d = t[a[s]].x, m = t[a[s]].y, !(d === h && m === l || d === c && m === u || d === f && m === p) && (w = d - h, M = m - l, S = d - c, T = m - u, E = d - f, C = m - p, P = g * T - v * S, A = b * M - _ * w, L = y * C - x * E, P >= -e && L >= -e && A >= -e)) return !1;
                        return !0
                    };
                return t.Triangulate = r, t.Triangulate.area = n, t
            }(i.FontUtils), self._typeface_js = {
                faces: i.FontUtils.faces,
                loadFace: i.FontUtils.loadFace
            }, i.typeface_js = self._typeface_js, i.Audio = function(t) {
                i.Object3D.call(this), this.type = "Audio", this.context = t.context, this.source = this.context.createBufferSource(), this.source.onended = this.onEnded.bind(this), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.panner = this.context.createPanner(), this.panner.connect(this.gain), this.autoplay = !1, this.startTime = 0, this.isPlaying = !1
            }, i.Audio.prototype = Object.create(i.Object3D.prototype), i.Audio.prototype.constructor = i.Audio, i.Audio.prototype.load = function(t) {
                var e = this,
                    r = new XMLHttpRequest;
                return r.open("GET", t, !0), r.responseType = "arraybuffer", r.onload = function(t) {
                    e.context.decodeAudioData(this.response, function(t) {
                        e.source.buffer = t, e.autoplay && e.play()
                    })
                }, r.send(), this
            }, i.Audio.prototype.play = function() {
                if (this.isPlaying === !0) return void i.warn("THREE.Audio: Audio is already playing.");
                var t = this.context.createBufferSource();
                t.buffer = this.source.buffer, t.loop = this.source.loop, t.onended = this.source.onended, t.connect(this.panner), t.start(0, this.startTime), this.isPlaying = !0, this.source = t
            }, i.Audio.prototype.pause = function() {
                this.source.stop(), this.startTime = this.context.currentTime
            }, i.Audio.prototype.stop = function() {
                this.source.stop(), this.startTime = 0
            }, i.Audio.prototype.onEnded = function() {
                this.isPlaying = !1
            }, i.Audio.prototype.setLoop = function(t) {
                this.source.loop = t
            }, i.Audio.prototype.setRefDistance = function(t) {
                this.panner.refDistance = t
            }, i.Audio.prototype.setRolloffFactor = function(t) {
                this.panner.rolloffFactor = t
            }, i.Audio.prototype.setVolume = function(t) {
                this.gain.gain.value = t
            }, i.Audio.prototype.updateMatrixWorld = function() {
                var t = new i.Vector3;
                return function(e) {
                    i.Object3D.prototype.updateMatrixWorld.call(this, e), t.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(t.x, t.y, t.z)
                }
            }(), i.AudioListener = function() {
                i.Object3D.call(this), this.type = "AudioListener", this.context = new(window.AudioContext || window.webkitAudioContext)
            }, i.AudioListener.prototype = Object.create(i.Object3D.prototype), i.AudioListener.prototype.constructor = i.AudioListener, i.AudioListener.prototype.updateMatrixWorld = function() {
                var t = new i.Vector3,
                    e = new i.Quaternion,
                    r = new i.Vector3,
                    n = new i.Vector3,
                    o = new i.Vector3,
                    a = new i.Vector3;
                return function(s) {
                    i.Object3D.prototype.updateMatrixWorld.call(this, s);
                    var h = this.context.listener,
                        l = this.up;
                    this.matrixWorld.decompose(t, e, r), n.set(0, 0, -1).applyQuaternion(e), o.subVectors(t, a), h.setPosition(t.x, t.y, t.z), h.setOrientation(n.x, n.y, n.z, l.x, l.y, l.z), h.setVelocity(o.x, o.y, o.z), a.copy(t)
                }
            }(), i.Curve = function() {}, i.Curve.prototype.getPoint = function(t) {
                return i.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
            }, i.Curve.prototype.getPointAt = function(t) {
                var e = this.getUtoTmapping(t);
                return this.getPoint(e)
            }, i.Curve.prototype.getPoints = function(t) {
                t || (t = 5);
                var e, r = [];
                for (e = 0; e <= t; e++) r.push(this.getPoint(e / t));
                return r
            }, i.Curve.prototype.getSpacedPoints = function(t) {
                t || (t = 5);
                var e, r = [];
                for (e = 0; e <= t; e++) r.push(this.getPointAt(e / t));
                return r
            }, i.Curve.prototype.getLength = function() {
                var t = this.getLengths();
                return t[t.length - 1]
            }, i.Curve.prototype.getLengths = function(t) {
                if (t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == t + 1 && !this.needsUpdate) return this.cacheArcLengths;
                this.needsUpdate = !1;
                var e, r, i = [],
                    n = this.getPoint(0),
                    o = 0;
                for (i.push(0), r = 1; r <= t; r++) e = this.getPoint(r / t), o += e.distanceTo(n), i.push(o), n = e;
                return this.cacheArcLengths = i, i
            }, i.Curve.prototype.updateArcLengths = function() {
                this.needsUpdate = !0, this.getLengths()
            }, i.Curve.prototype.getUtoTmapping = function(t, e) {
                var r, i = this.getLengths(),
                    n = 0,
                    o = i.length;
                r = e ? e : t * i[o - 1];
                for (var a, s = 0, h = o - 1; s <= h;)
                    if (n = Math.floor(s + (h - s) / 2), a = i[n] - r, a < 0) s = n + 1;
                    else {
                        if (!(a > 0)) {
                            h = n;
                            break
                        }
                        h = n - 1
                    }
                if (n = h, i[n] == r) {
                    var l = n / (o - 1);
                    return l
                }
                var c = i[n],
                    u = i[n + 1],
                    f = u - c,
                    p = (r - c) / f,
                    l = (n + p) / (o - 1);
                return l
            }, i.Curve.prototype.getTangent = function(t) {
                var e = 1e-4,
                    r = t - e,
                    i = t + e;
                r < 0 && (r = 0), i > 1 && (i = 1);
                var n = this.getPoint(r),
                    o = this.getPoint(i),
                    a = o.clone().sub(n);
                return a.normalize()
            }, i.Curve.prototype.getTangentAt = function(t) {
                var e = this.getUtoTmapping(t);
                return this.getTangent(e)
            }, i.Curve.Utils = {
                tangentQuadraticBezier: function(t, e, r, i) {
                    return 2 * (1 - t) * (r - e) + 2 * t * (i - r)
                },
                tangentCubicBezier: function(t, e, r, i, n) {
                    return -3 * e * (1 - t) * (1 - t) + 3 * r * (1 - t) * (1 - t) - 6 * t * r * (1 - t) + 6 * t * i * (1 - t) - 3 * t * t * i + 3 * t * t * n
                },
                tangentSpline: function(t, e, r, i, n) {
                    var o = 6 * t * t - 6 * t,
                        a = 3 * t * t - 4 * t + 1,
                        s = -6 * t * t + 6 * t,
                        h = 3 * t * t - 2 * t;
                    return o + a + s + h
                },
                interpolate: function(t, e, r, i, n) {
                    var o = .5 * (r - t),
                        a = .5 * (i - e),
                        s = n * n,
                        h = n * s;
                    return (2 * e - 2 * r + o + a) * h + (-3 * e + 3 * r - 2 * o - a) * s + o * n + e
                }
            }, i.Curve.create = function(t, e) {
                return t.prototype = Object.create(i.Curve.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t
            }, i.CurvePath = function() {
                this.curves = [], this.bends = [], this.autoClose = !1
            }, i.CurvePath.prototype = Object.create(i.Curve.prototype), i.CurvePath.prototype.constructor = i.CurvePath, i.CurvePath.prototype.add = function(t) {
                this.curves.push(t)
            }, i.CurvePath.prototype.checkConnection = function() {}, i.CurvePath.prototype.closePath = function() {
                var t = this.curves[0].getPoint(0),
                    e = this.curves[this.curves.length - 1].getPoint(1);
                t.equals(e) || this.curves.push(new i.LineCurve(e, t))
            }, i.CurvePath.prototype.getPoint = function(t) {
                for (var e, r, i = t * this.getLength(), n = this.getCurveLengths(), o = 0; o < n.length;) {
                    if (n[o] >= i) {
                        e = n[o] - i, r = this.curves[o];
                        var a = 1 - e / r.getLength();
                        return r.getPointAt(a)
                    }
                    o++
                }
                return null
            }, i.CurvePath.prototype.getLength = function() {
                var t = this.getCurveLengths();
                return t[t.length - 1]
            }, i.CurvePath.prototype.getCurveLengths = function() {
                if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
                var t, e = [],
                    r = 0,
                    i = this.curves.length;
                for (t = 0; t < i; t++) r += this.curves[t].getLength(), e.push(r);
                return this.cacheLengths = e, e
            }, i.CurvePath.prototype.getBoundingBox = function() {
                var t, e, r, n, o, a, s = this.getPoints();
                t = e = Number.NEGATIVE_INFINITY, n = o = Number.POSITIVE_INFINITY;
                var h, l, c, u, f = s[0] instanceof i.Vector3;
                for (u = f ? new i.Vector3 : new i.Vector2, l = 0, c = s.length; l < c; l++) h = s[l], h.x > t ? t = h.x : h.x < n && (n = h.x), h.y > e ? e = h.y : h.y < o && (o = h.y), f && (h.z > r ? r = h.z : h.z < a && (a = h.z)), u.add(h);
                var p = {
                    minX: n,
                    minY: o,
                    maxX: t,
                    maxY: e
                };
                return f && (p.maxZ = r, p.minZ = a), p
            }, i.CurvePath.prototype.createPointsGeometry = function(t) {
                var e = this.getPoints(t, !0);
                return this.createGeometry(e)
            }, i.CurvePath.prototype.createSpacedPointsGeometry = function(t) {
                var e = this.getSpacedPoints(t, !0);
                return this.createGeometry(e)
            }, i.CurvePath.prototype.createGeometry = function(t) {
                for (var e = new i.Geometry, r = 0; r < t.length; r++) e.vertices.push(new i.Vector3(t[r].x, t[r].y, t[r].z || 0));
                return e
            }, i.CurvePath.prototype.addWrapPath = function(t) {
                this.bends.push(t)
            }, i.CurvePath.prototype.getTransformedPoints = function(t, e) {
                var r, i, n = this.getPoints(t);
                for (e || (e = this.bends), r = 0, i = e.length; r < i; r++) n = this.getWrapPoints(n, e[r]);
                return n
            }, i.CurvePath.prototype.getTransformedSpacedPoints = function(t, e) {
                var r, i, n = this.getSpacedPoints(t);
                for (e || (e = this.bends), r = 0, i = e.length; r < i; r++) n = this.getWrapPoints(n, e[r]);
                return n
            }, i.CurvePath.prototype.getWrapPoints = function(t, e) {
                var r, i, n, o, a, s, h = this.getBoundingBox();
                for (r = 0, i = t.length; r < i; r++) {
                    n = t[r], o = n.x, a = n.y, s = o / h.maxX, s = e.getUtoTmapping(s, o);
                    var l = e.getPoint(s),
                        c = e.getTangent(s);
                    c.set(-c.y, c.x).multiplyScalar(a), n.x = l.x + c.x, n.y = l.y + c.y
                }
                return t
            }, i.Gyroscope = function() {
                i.Object3D.call(this)
            }, i.Gyroscope.prototype = Object.create(i.Object3D.prototype), i.Gyroscope.prototype.constructor = i.Gyroscope, i.Gyroscope.prototype.updateMatrixWorld = function() {
                var t = new i.Vector3,
                    e = new i.Quaternion,
                    r = new i.Vector3,
                    n = new i.Vector3,
                    o = new i.Quaternion,
                    a = new i.Vector3;
                return function(i) {
                    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || i) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(n, o, a), this.matrix.decompose(t, e, r), this.matrixWorld.compose(n, e, a)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, i = !0);
                    for (var s = 0, h = this.children.length; s < h; s++) this.children[s].updateMatrixWorld(i)
                }
            }(), i.Path = function(t) {
                i.CurvePath.call(this), this.actions = [], t && this.fromPoints(t)
            }, i.Path.prototype = Object.create(i.CurvePath.prototype), i.Path.prototype.constructor = i.Path, i.PathActions = {
                MOVE_TO: "moveTo",
                LINE_TO: "lineTo",
                QUADRATIC_CURVE_TO: "quadraticCurveTo",
                BEZIER_CURVE_TO: "bezierCurveTo",
                CSPLINE_THRU: "splineThru",
                ARC: "arc",
                ELLIPSE: "ellipse"
            }, i.Path.prototype.fromPoints = function(t) {
                this.moveTo(t[0].x, t[0].y);
                for (var e = 1, r = t.length; e < r; e++) this.lineTo(t[e].x, t[e].y)
            }, i.Path.prototype.moveTo = function(t, e) {
                var r = Array.prototype.slice.call(arguments);
                this.actions.push({
                    action: i.PathActions.MOVE_TO,
                    args: r
                })
            }, i.Path.prototype.lineTo = function(t, e) {
                var r = Array.prototype.slice.call(arguments),
                    n = this.actions[this.actions.length - 1].args,
                    o = n[n.length - 2],
                    a = n[n.length - 1],
                    s = new i.LineCurve(new i.Vector2(o, a), new i.Vector2(t, e));
                this.curves.push(s), this.actions.push({
                    action: i.PathActions.LINE_TO,
                    args: r
                })
            }, i.Path.prototype.quadraticCurveTo = function(t, e, r, n) {
                var o = Array.prototype.slice.call(arguments),
                    a = this.actions[this.actions.length - 1].args,
                    s = a[a.length - 2],
                    h = a[a.length - 1],
                    l = new i.QuadraticBezierCurve(new i.Vector2(s, h), new i.Vector2(t, e), new i.Vector2(r, n));
                this.curves.push(l), this.actions.push({
                    action: i.PathActions.QUADRATIC_CURVE_TO,
                    args: o
                })
            }, i.Path.prototype.bezierCurveTo = function(t, e, r, n, o, a) {
                var s = Array.prototype.slice.call(arguments),
                    h = this.actions[this.actions.length - 1].args,
                    l = h[h.length - 2],
                    c = h[h.length - 1],
                    u = new i.CubicBezierCurve(new i.Vector2(l, c), new i.Vector2(t, e), new i.Vector2(r, n), new i.Vector2(o, a));
                this.curves.push(u), this.actions.push({
                    action: i.PathActions.BEZIER_CURVE_TO,
                    args: s
                })
            }, i.Path.prototype.splineThru = function(t) {
                var e = Array.prototype.slice.call(arguments),
                    r = this.actions[this.actions.length - 1].args,
                    n = r[r.length - 2],
                    o = r[r.length - 1],
                    a = [new i.Vector2(n, o)];
                Array.prototype.push.apply(a, t);
                var s = new i.SplineCurve(a);
                this.curves.push(s), this.actions.push({
                    action: i.PathActions.CSPLINE_THRU,
                    args: e
                })
            }, i.Path.prototype.arc = function(t, e, r, i, n, o) {
                var a = this.actions[this.actions.length - 1].args,
                    s = a[a.length - 2],
                    h = a[a.length - 1];
                this.absarc(t + s, e + h, r, i, n, o)
            }, i.Path.prototype.absarc = function(t, e, r, i, n, o) {
                this.absellipse(t, e, r, r, i, n, o)
            }, i.Path.prototype.ellipse = function(t, e, r, i, n, o, a) {
                var s = this.actions[this.actions.length - 1].args,
                    h = s[s.length - 2],
                    l = s[s.length - 1];
                this.absellipse(t + h, e + l, r, i, n, o, a)
            }, i.Path.prototype.absellipse = function(t, e, r, n, o, a, s) {
                var h = Array.prototype.slice.call(arguments),
                    l = new i.EllipseCurve(t, e, r, n, o, a, s);
                this.curves.push(l);
                var c = l.getPoint(1);
                h.push(c.x), h.push(c.y), this.actions.push({
                    action: i.PathActions.ELLIPSE,
                    args: h
                })
            }, i.Path.prototype.getSpacedPoints = function(t, e) {
                t || (t = 40);
                for (var r = [], i = 0; i < t; i++) r.push(this.getPoint(i / t));
                return r
            }, i.Path.prototype.getPoints = function(t, e) {
                if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(t, e);
                t = t || 12;
                var r, n, o, a, s, h, l, c, u, f, p, d, m, g, v, y, x, b, _ = [];
                for (r = 0, n = this.actions.length; r < n; r++) switch (o = this.actions[r], a = o.action, s = o.args, a) {
                    case i.PathActions.MOVE_TO:
                        _.push(new i.Vector2(s[0], s[1]));
                        break;
                    case i.PathActions.LINE_TO:
                        _.push(new i.Vector2(s[0], s[1]));
                        break;
                    case i.PathActions.QUADRATIC_CURVE_TO:
                        for (h = s[2], l = s[3], f = s[0], p = s[1], _.length > 0 ? (g = _[_.length - 1], d = g.x, m = g.y) : (g = this.actions[r - 1].args, d = g[g.length - 2], m = g[g.length - 1]), v = 1; v <= t; v++) y = v / t, x = i.Shape.Utils.b2(y, d, f, h), b = i.Shape.Utils.b2(y, m, p, l), _.push(new i.Vector2(x, b));
                        break;
                    case i.PathActions.BEZIER_CURVE_TO:
                        for (h = s[4], l = s[5], f = s[0], p = s[1], c = s[2], u = s[3], _.length > 0 ? (g = _[_.length - 1], d = g.x, m = g.y) : (g = this.actions[r - 1].args, d = g[g.length - 2], m = g[g.length - 1]), v = 1; v <= t; v++) y = v / t, x = i.Shape.Utils.b3(y, d, f, c, h), b = i.Shape.Utils.b3(y, m, p, u, l), _.push(new i.Vector2(x, b));
                        break;
                    case i.PathActions.CSPLINE_THRU:
                        g = this.actions[r - 1].args;
                        var w = new i.Vector2(g[g.length - 2], g[g.length - 1]),
                            M = [w],
                            S = t * s[0].length;
                        M = M.concat(s[0]);
                        var T = new i.SplineCurve(M);
                        for (v = 1; v <= S; v++) _.push(T.getPointAt(v / S));
                        break;
                    case i.PathActions.ARC:
                        var E, C = s[0],
                            A = s[1],
                            L = s[2],
                            P = s[3],
                            R = s[4],
                            F = !!s[5],
                            D = R - P,
                            B = 2 * t;
                        for (v = 1; v <= B; v++) y = v / B, F || (y = 1 - y), E = P + y * D, x = C + L * Math.cos(E), b = A + L * Math.sin(E), _.push(new i.Vector2(x, b));
                        break;
                    case i.PathActions.ELLIPSE:
                        var E, C = s[0],
                            A = s[1],
                            U = s[2],
                            V = s[3],
                            P = s[4],
                            R = s[5],
                            F = !!s[6],
                            D = R - P,
                            B = 2 * t;
                        for (v = 1; v <= B; v++) y = v / B, F || (y = 1 - y), E = P + y * D, x = C + U * Math.cos(E), b = A + V * Math.sin(E), _.push(new i.Vector2(x, b))
                }
                var O = _[_.length - 1],
                    z = 1e-10;
                return Math.abs(O.x - _[0].x) < z && Math.abs(O.y - _[0].y) < z && _.splice(_.length - 1, 1), e && _.push(_[0]), _
            }, i.Path.prototype.toShapes = function(t, e) {
                function r(t) {
                    var e, r, n, o, a, s = [],
                        h = new i.Path;
                    for (e = 0, r = t.length; e < r; e++) n = t[e], a = n.args, o = n.action, o == i.PathActions.MOVE_TO && 0 != h.actions.length && (s.push(h), h = new i.Path), h[o].apply(h, a);
                    return 0 != h.actions.length && s.push(h), s
                }

                function n(t) {
                    for (var e = [], r = 0, n = t.length; r < n; r++) {
                        var o = t[r],
                            a = new i.Shape;
                        a.actions = o.actions, a.curves = o.curves, e.push(a)
                    }
                    return e
                }

                function o(t, e) {
                    for (var r = 1e-10, i = e.length, n = !1, o = i - 1, a = 0; a < i; o = a++) {
                        var s = e[o],
                            h = e[a],
                            l = h.x - s.x,
                            c = h.y - s.y;
                        if (Math.abs(c) > r) {
                            if (c < 0 && (s = e[a], l = -l, h = e[o], c = -c), t.y < s.y || t.y > h.y) continue;
                            if (t.y == s.y) {
                                if (t.x == s.x) return !0
                            } else {
                                var u = c * (t.x - s.x) - l * (t.y - s.y);
                                if (0 == u) return !0;
                                if (u < 0) continue;
                                n = !n
                            }
                        } else {
                            if (t.y != s.y) continue;
                            if (h.x <= t.x && t.x <= s.x || s.x <= t.x && t.x <= h.x) return !0
                        }
                    }
                    return n
                }
                var a = r(this.actions);
                if (0 == a.length) return [];
                if (e === !0) return n(a);
                var s, h, l, c = [];
                if (1 == a.length) return h = a[0], l = new i.Shape, l.actions = h.actions, l.curves = h.curves, c.push(l), c;
                var u = !i.Shape.Utils.isClockWise(a[0].getPoints());
                u = t ? !u : u;
                var f, p = [],
                    d = [],
                    m = [],
                    g = 0;
                d[g] = void 0, m[g] = [];
                var v, y;
                for (v = 0, y = a.length; v < y; v++) h = a[v], f = h.getPoints(), s = i.Shape.Utils.isClockWise(f), s = t ? !s : s, s ? (!u && d[g] && g++, d[g] = {
                    s: new i.Shape,
                    p: f
                }, d[g].s.actions = h.actions, d[g].s.curves = h.curves, u && g++, m[g] = []) : m[g].push({
                    h: h,
                    p: f[0]
                });
                if (!d[0]) return n(a);
                if (d.length > 1) {
                    for (var x = !1, b = [], _ = 0, w = d.length; _ < w; _++) p[_] = [];
                    for (var _ = 0, w = d.length; _ < w; _++)
                        for (var M = m[_], S = 0; S < M.length; S++) {
                            for (var T = M[S], E = !0, C = 0; C < d.length; C++) o(T.p, d[C].p) && (_ != C && b.push({
                                froms: _,
                                tos: C,
                                hole: S
                            }), E ? (E = !1, p[C].push(T)) : x = !0);
                            E && p[_].push(T)
                        }
                    b.length > 0 && (x || (m = p))
                }
                var A, L, P;
                for (v = 0, y = d.length; v < y; v++)
                    for (l = d[v].s, c.push(l), A = m[v], L = 0, P = A.length; L < P; L++) l.holes.push(A[L].h);
                return c
            }, i.Shape = function() {
                i.Path.apply(this, arguments), this.holes = []
            }, i.Shape.prototype = Object.create(i.Path.prototype), i.Shape.prototype.constructor = i.Shape, i.Shape.prototype.extrude = function(t) {
                var e = new i.ExtrudeGeometry(this, t);
                return e
            }, i.Shape.prototype.makeGeometry = function(t) {
                var e = new i.ShapeGeometry(this, t);
                return e
            }, i.Shape.prototype.getPointsHoles = function(t) {
                var e, r = this.holes.length,
                    i = [];
                for (e = 0; e < r; e++) i[e] = this.holes[e].getTransformedPoints(t, this.bends);
                return i
            }, i.Shape.prototype.getSpacedPointsHoles = function(t) {
                var e, r = this.holes.length,
                    i = [];
                for (e = 0; e < r; e++) i[e] = this.holes[e].getTransformedSpacedPoints(t, this.bends);
                return i
            }, i.Shape.prototype.extractAllPoints = function(t) {
                return {
                    shape: this.getTransformedPoints(t),
                    holes: this.getPointsHoles(t)
                }
            }, i.Shape.prototype.extractPoints = function(t) {
                return this.useSpacedPoints ? this.extractAllSpacedPoints(t) : this.extractAllPoints(t)
            }, i.Shape.prototype.extractAllSpacedPoints = function(t) {
                return {
                    shape: this.getTransformedSpacedPoints(t),
                    holes: this.getSpacedPointsHoles(t)
                }
            }, i.Shape.Utils = {
                triangulateShape: function(t, e) {
                    function r(t, e, r) {
                        return t.x != e.x ? t.x < e.x ? t.x <= r.x && r.x <= e.x : e.x <= r.x && r.x <= t.x : t.y < e.y ? t.y <= r.y && r.y <= e.y : e.y <= r.y && r.y <= t.y
                    }

                    function n(t, e, i, n, o) {
                        var a = 1e-10,
                            s = e.x - t.x,
                            h = e.y - t.y,
                            l = n.x - i.x,
                            c = n.y - i.y,
                            u = t.x - i.x,
                            f = t.y - i.y,
                            p = h * l - s * c,
                            d = h * u - s * f;
                        if (Math.abs(p) > a) {
                            var m;
                            if (p > 0) {
                                if (d < 0 || d > p) return [];
                                if (m = c * u - l * f, m < 0 || m > p) return []
                            } else {
                                if (d > 0 || d < p) return [];
                                if (m = c * u - l * f, m > 0 || m < p) return []
                            }
                            if (0 == m) return !o || 0 != d && d != p ? [t] : [];
                            if (m == p) return !o || 0 != d && d != p ? [e] : [];
                            if (0 == d) return [i];
                            if (d == p) return [n];
                            var g = m / p;
                            return [{
                                x: t.x + g * s,
                                y: t.y + g * h
                            }]
                        }
                        if (0 != d || c * u != l * f) return [];
                        var v = 0 == s && 0 == h,
                            y = 0 == l && 0 == c;
                        if (v && y) return t.x != i.x || t.y != i.y ? [] : [t];
                        if (v) return r(i, n, t) ? [t] : [];
                        if (y) return r(t, e, i) ? [i] : [];
                        var x, b, _, w, M, S, T, E;
                        return 0 != s ? (t.x < e.x ? (x = t, _ = t.x, b = e, w = e.x) : (x = e, _ = e.x, b = t, w = t.x), i.x < n.x ? (M = i, T = i.x, S = n, E = n.x) : (M = n, T = n.x, S = i, E = i.x)) : (t.y < e.y ? (x = t, _ = t.y, b = e, w = e.y) : (x = e, _ = e.y, b = t, w = t.y), i.y < n.y ? (M = i, T = i.y, S = n, E = n.y) : (M = n, T = n.y, S = i, E = i.y)), _ <= T ? w < T ? [] : w == T ? o ? [] : [M] : w <= E ? [M, b] : [M, S] : _ > E ? [] : _ == E ? o ? [] : [x] : w <= E ? [x, b] : [x, S]
                    }

                    function o(t, e, r, i) {
                        var n = 1e-10,
                            o = e.x - t.x,
                            a = e.y - t.y,
                            s = r.x - t.x,
                            h = r.y - t.y,
                            l = i.x - t.x,
                            c = i.y - t.y,
                            u = o * h - a * s,
                            f = o * c - a * l;
                        if (Math.abs(u) > n) {
                            var p = l * h - c * s;
                            return u > 0 ? f >= 0 && p >= 0 : f >= 0 || p >= 0
                        }
                        return f > 0
                    }

                    function a(t, e) {
                        function r(t, e) {
                            var r = y.length - 1,
                                i = t - 1;
                            i < 0 && (i = r);
                            var n = t + 1;
                            n > r && (n = 0);
                            var a = o(y[t], y[i], y[n], s[e]);
                            if (!a) return !1;
                            var h = s.length - 1,
                                l = e - 1;
                            l < 0 && (l = h);
                            var c = e + 1;
                            return c > h && (c = 0), a = o(s[e], s[l], s[c], y[t]), !!a
                        }

                        function i(t, e) {
                            var r, i, o;
                            for (r = 0; r < y.length; r++)
                                if (i = r + 1, i %= y.length, o = n(t, e, y[r], y[i], !0), o.length > 0) return !0;
                            return !1
                        }

                        function a(t, r) {
                            var i, o, a, s, h;
                            for (i = 0; i < x.length; i++)
                                for (o = e[x[i]], a = 0; a < o.length; a++)
                                    if (s = a + 1, s %= o.length, h = n(t, r, o[a], o[s], !0), h.length > 0) return !0;
                            return !1
                        }
                        for (var s, h, l, c, u, f, p, d, m, g, v, y = t.concat(), x = [], b = [], _ = 0, w = e.length; _ < w; _++) x.push(_);
                        for (var M = 0, S = 2 * x.length; x.length > 0;) {
                            if (S--, S < 0) {
                                console.log("Infinite Loop! Holes left:" + x.length + ", Probably Hole outside Shape!");
                                break
                            }
                            for (l = M; l < y.length; l++) {
                                c = y[l], h = -1;
                                for (var _ = 0; _ < x.length; _++)
                                    if (f = x[_], p = c.x + ":" + c.y + ":" + f, void 0 === b[p]) {
                                        s = e[f];
                                        for (var T = 0; T < s.length; T++)
                                            if (u = s[T], r(l, T) && !i(c, u) && !a(c, u)) {
                                                h = T, x.splice(_, 1), d = y.slice(0, l + 1), m = y.slice(l), g = s.slice(h), v = s.slice(0, h + 1), y = d.concat(g).concat(v).concat(m), M = l;
                                                break
                                            }
                                        if (h >= 0) break;
                                        b[p] = !0
                                    }
                                if (h >= 0) break
                            }
                        }
                        return y
                    }
                    for (var s, h, l, c, u, f, p = {}, d = t.concat(), m = 0, g = e.length; m < g; m++) Array.prototype.push.apply(d, e[m]);
                    for (s = 0, h = d.length; s < h; s++) u = d[s].x + ":" + d[s].y, void 0 !== p[u] && i.warn("THREE.Shape: Duplicate point", u), p[u] = s;
                    var v = a(t, e),
                        y = i.FontUtils.Triangulate(v, !1);
                    for (s = 0, h = y.length; s < h; s++)
                        for (c = y[s], l = 0; l < 3; l++) u = c[l].x + ":" + c[l].y, f = p[u], void 0 !== f && (c[l] = f);
                    return y.concat()
                },
                isClockWise: function(t) {
                    return i.FontUtils.Triangulate.area(t) < 0
                },
                b2p0: function(t, e) {
                    var r = 1 - t;
                    return r * r * e
                },
                b2p1: function(t, e) {
                    return 2 * (1 - t) * t * e
                },
                b2p2: function(t, e) {
                    return t * t * e
                },
                b2: function(t, e, r, i) {
                    return this.b2p0(t, e) + this.b2p1(t, r) + this.b2p2(t, i)
                },
                b3p0: function(t, e) {
                    var r = 1 - t;
                    return r * r * r * e
                },
                b3p1: function(t, e) {
                    var r = 1 - t;
                    return 3 * r * r * t * e
                },
                b3p2: function(t, e) {
                    var r = 1 - t;
                    return 3 * r * t * t * e
                },
                b3p3: function(t, e) {
                    return t * t * t * e
                },
                b3: function(t, e, r, i, n) {
                    return this.b3p0(t, e) + this.b3p1(t, r) + this.b3p2(t, i) + this.b3p3(t, n)
                }
            }, i.LineCurve = function(t, e) {
                this.v1 = t, this.v2 = e
            }, i.LineCurve.prototype = Object.create(i.Curve.prototype), i.LineCurve.prototype.constructor = i.LineCurve, i.LineCurve.prototype.getPoint = function(t) {
                var e = this.v2.clone().sub(this.v1);
                return e.multiplyScalar(t).add(this.v1), e
            }, i.LineCurve.prototype.getPointAt = function(t) {
                return this.getPoint(t)
            }, i.LineCurve.prototype.getTangent = function(t) {
                var e = this.v2.clone().sub(this.v1);
                return e.normalize()
            }, i.QuadraticBezierCurve = function(t, e, r) {
                this.v0 = t, this.v1 = e, this.v2 = r
            }, i.QuadraticBezierCurve.prototype = Object.create(i.Curve.prototype), i.QuadraticBezierCurve.prototype.constructor = i.QuadraticBezierCurve, i.QuadraticBezierCurve.prototype.getPoint = function(t) {
                var e = new i.Vector2;
                return e.x = i.Shape.Utils.b2(t, this.v0.x, this.v1.x, this.v2.x), e.y = i.Shape.Utils.b2(t, this.v0.y, this.v1.y, this.v2.y), e
            }, i.QuadraticBezierCurve.prototype.getTangent = function(t) {
                var e = new i.Vector2;
                return e.x = i.Curve.Utils.tangentQuadraticBezier(t, this.v0.x, this.v1.x, this.v2.x), e.y = i.Curve.Utils.tangentQuadraticBezier(t, this.v0.y, this.v1.y, this.v2.y), e.normalize()
            }, i.CubicBezierCurve = function(t, e, r, i) {
                this.v0 = t, this.v1 = e, this.v2 = r, this.v3 = i
            }, i.CubicBezierCurve.prototype = Object.create(i.Curve.prototype), i.CubicBezierCurve.prototype.constructor = i.CubicBezierCurve, i.CubicBezierCurve.prototype.getPoint = function(t) {
                var e, r;
                return e = i.Shape.Utils.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = i.Shape.Utils.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new i.Vector2(e, r)
            }, i.CubicBezierCurve.prototype.getTangent = function(t) {
                var e, r;
                e = i.Curve.Utils.tangentCubicBezier(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = i.Curve.Utils.tangentCubicBezier(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
                var n = new i.Vector2(e, r);
                return n.normalize(), n
            }, i.SplineCurve = function(t) {
                this.points = void 0 == t ? [] : t
            }, i.SplineCurve.prototype = Object.create(i.Curve.prototype), i.SplineCurve.prototype.constructor = i.SplineCurve, i.SplineCurve.prototype.getPoint = function(t) {
                var e = this.points,
                    r = (e.length - 1) * t,
                    n = Math.floor(r),
                    o = r - n,
                    a = e[0 == n ? n : n - 1],
                    s = e[n],
                    h = e[n > e.length - 2 ? e.length - 1 : n + 1],
                    l = e[n > e.length - 3 ? e.length - 1 : n + 2],
                    c = new i.Vector2;
                return c.x = i.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = i.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c
            }, i.EllipseCurve = function(t, e, r, i, n, o, a) {
                this.aX = t, this.aY = e, this.xRadius = r, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = o, this.aClockwise = a
            }, i.EllipseCurve.prototype = Object.create(i.Curve.prototype), i.EllipseCurve.prototype.constructor = i.EllipseCurve, i.EllipseCurve.prototype.getPoint = function(t) {
                var e = this.aEndAngle - this.aStartAngle;
                e < 0 && (e += 2 * Math.PI), e > 2 * Math.PI && (e -= 2 * Math.PI);
                var r;
                r = this.aClockwise === !0 ? this.aEndAngle + (1 - t) * (2 * Math.PI - e) : this.aStartAngle + t * e;
                var n = new i.Vector2;
                return n.x = this.aX + this.xRadius * Math.cos(r), n.y = this.aY + this.yRadius * Math.sin(r), n
            }, i.ArcCurve = function(t, e, r, n, o, a) {
                i.EllipseCurve.call(this, t, e, r, r, n, o, a)
            }, i.ArcCurve.prototype = Object.create(i.EllipseCurve.prototype), i.ArcCurve.prototype.constructor = i.ArcCurve, i.LineCurve3 = i.Curve.create(function(t, e) {
                this.v1 = t, this.v2 = e
            }, function(t) {
                var e = new i.Vector3;
                return e.subVectors(this.v2, this.v1), e.multiplyScalar(t), e.add(this.v1), e
            }), i.QuadraticBezierCurve3 = i.Curve.create(function(t, e, r) {
                this.v0 = t, this.v1 = e, this.v2 = r
            }, function(t) {
                var e = new i.Vector3;
                return e.x = i.Shape.Utils.b2(t, this.v0.x, this.v1.x, this.v2.x), e.y = i.Shape.Utils.b2(t, this.v0.y, this.v1.y, this.v2.y), e.z = i.Shape.Utils.b2(t, this.v0.z, this.v1.z, this.v2.z), e
            }), i.CubicBezierCurve3 = i.Curve.create(function(t, e, r, i) {
                this.v0 = t, this.v1 = e, this.v2 = r, this.v3 = i
            }, function(t) {
                var e = new i.Vector3;
                return e.x = i.Shape.Utils.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e.y = i.Shape.Utils.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y), e.z = i.Shape.Utils.b3(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z), e
            }), i.SplineCurve3 = i.Curve.create(function(t) {
                this.points = void 0 == t ? [] : t
            }, function(t) {
                var e = this.points,
                    r = (e.length - 1) * t,
                    n = Math.floor(r),
                    o = r - n,
                    a = e[0 == n ? n : n - 1],
                    s = e[n],
                    h = e[n > e.length - 2 ? e.length - 1 : n + 1],
                    l = e[n > e.length - 3 ? e.length - 1 : n + 2],
                    c = new i.Vector3;
                return c.x = i.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = i.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = i.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
            }), i.ClosedSplineCurve3 = i.Curve.create(function(t) {
                this.points = void 0 == t ? [] : t
            }, function(t) {
                var e = this.points,
                    r = (e.length - 0) * t,
                    n = Math.floor(r),
                    o = r - n;
                n += n > 0 ? 0 : (Math.floor(Math.abs(n) / e.length) + 1) * e.length;
                var a = e[(n - 1) % e.length],
                    s = e[n % e.length],
                    h = e[(n + 1) % e.length],
                    l = e[(n + 2) % e.length],
                    c = new i.Vector3;
                return c.x = i.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = i.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = i.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
            }), i.AnimationHandler = {
                LINEAR: 0,
                CATMULLROM: 1,
                CATMULLROM_FORWARD: 2,
                add: function() {
                    i.warn("THREE.AnimationHandler.add() has been deprecated.")
                },
                get: function() {
                    i.warn("THREE.AnimationHandler.get() has been deprecated.")
                },
                remove: function() {
                    i.warn("THREE.AnimationHandler.remove() has been deprecated.")
                },
                animations: [],
                init: function(t) {
                    if (t.initialized === !0) return t;
                    for (var e = 0; e < t.hierarchy.length; e++) {
                        for (var r = 0; r < t.hierarchy[e].keys.length; r++)
                            if (t.hierarchy[e].keys[r].time < 0 && (t.hierarchy[e].keys[r].time = 0), void 0 !== t.hierarchy[e].keys[r].rot && !(t.hierarchy[e].keys[r].rot instanceof i.Quaternion)) {
                                var n = t.hierarchy[e].keys[r].rot;
                                t.hierarchy[e].keys[r].rot = (new i.Quaternion).fromArray(n)
                            }
                        if (t.hierarchy[e].keys.length && void 0 !== t.hierarchy[e].keys[0].morphTargets) {
                            for (var o = {}, r = 0; r < t.hierarchy[e].keys.length; r++)
                                for (var a = 0; a < t.hierarchy[e].keys[r].morphTargets.length; a++) {
                                    var s = t.hierarchy[e].keys[r].morphTargets[a];
                                    o[s] = -1
                                }
                            t.hierarchy[e].usedMorphTargets = o;
                            for (var r = 0; r < t.hierarchy[e].keys.length; r++) {
                                var h = {};
                                for (var s in o) {
                                    for (var a = 0; a < t.hierarchy[e].keys[r].morphTargets.length; a++)
                                        if (t.hierarchy[e].keys[r].morphTargets[a] === s) {
                                            h[s] = t.hierarchy[e].keys[r].morphTargetsInfluences[a];
                                            break
                                        }
                                    a === t.hierarchy[e].keys[r].morphTargets.length && (h[s] = 0)
                                }
                                t.hierarchy[e].keys[r].morphTargetsInfluences = h
                            }
                        }
                        for (var r = 1; r < t.hierarchy[e].keys.length; r++) t.hierarchy[e].keys[r].time === t.hierarchy[e].keys[r - 1].time && (t.hierarchy[e].keys.splice(r, 1), r--);
                        for (var r = 0; r < t.hierarchy[e].keys.length; r++) t.hierarchy[e].keys[r].index = r
                    }
                    return t.initialized = !0, t
                },
                parse: function(t) {
                    var e = function(t, r) {
                            r.push(t);
                            for (var i = 0; i < t.children.length; i++) e(t.children[i], r)
                        },
                        r = [];
                    if (t instanceof i.SkinnedMesh)
                        for (var n = 0; n < t.skeleton.bones.length; n++) r.push(t.skeleton.bones[n]);
                    else e(t, r);
                    return r
                },
                play: function(t) {
                    this.animations.indexOf(t) === -1 && this.animations.push(t)
                },
                stop: function(t) {
                    var e = this.animations.indexOf(t);
                    e !== -1 && this.animations.splice(e, 1)
                },
                update: function(t) {
                    for (var e = 0; e < this.animations.length; e++) this.animations[e].resetBlendWeights();
                    for (var e = 0; e < this.animations.length; e++) this.animations[e].update(t)
                }
            }, i.Animation = function(t, e) {
                this.root = t, this.data = i.AnimationHandler.init(e), this.hierarchy = i.AnimationHandler.parse(t), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = !0, this.weight = 0, this.interpolationType = i.AnimationHandler.LINEAR
            }, i.Animation.prototype = {
                constructor: i.Animation,
                keyTypes: ["pos", "rot", "scl"],
                play: function(t, e) {
                    this.currentTime = void 0 !== t ? t : 0, this.weight = void 0 !== e ? e : 1, this.isPlaying = !0, this.reset(), i.AnimationHandler.play(this)
                },
                stop: function() {
                    this.isPlaying = !1, i.AnimationHandler.stop(this)
                },
                reset: function() {
                    for (var t = 0, e = this.hierarchy.length; t < e; t++) {
                        var r = this.hierarchy[t];
                        void 0 === r.animationCache && (r.animationCache = {
                            animations: {},
                            blending: {
                                positionWeight: 0,
                                quaternionWeight: 0,
                                scaleWeight: 0
                            }
                        });
                        var i = this.data.name,
                            n = r.animationCache.animations,
                            o = n[i];
                        void 0 === o && (o = {
                            prevKey: {
                                pos: 0,
                                rot: 0,
                                scl: 0
                            },
                            nextKey: {
                                pos: 0,
                                rot: 0,
                                scl: 0
                            },
                            originalMatrix: r.matrix
                        }, n[i] = o);
                        for (var a = 0; a < 3; a++) {
                            for (var s = this.keyTypes[a], h = this.data.hierarchy[t].keys[0], l = this.getNextKeyWith(s, t, 1); l.time < this.currentTime && l.index > h.index;) h = l, l = this.getNextKeyWith(s, t, l.index + 1);
                            o.prevKey[s] = h, o.nextKey[s] = l
                        }
                    }
                },
                resetBlendWeights: function() {
                    for (var t = 0, e = this.hierarchy.length; t < e; t++) {
                        var r = this.hierarchy[t],
                            i = r.animationCache;
                        if (void 0 !== i) {
                            var n = i.blending;
                            n.positionWeight = 0, n.quaternionWeight = 0, n.scaleWeight = 0
                        }
                    }
                },
                update: function() {
                    var t = [],
                        e = new i.Vector3,
                        r = new i.Vector3,
                        n = new i.Quaternion,
                        o = function(t, e) {
                            var r, i, n, o, s, h, l, c, u, f = [],
                                p = [];
                            return r = (t.length - 1) * e, i = Math.floor(r), n = r - i, f[0] = 0 === i ? i : i - 1, f[1] = i, f[2] = i > t.length - 2 ? i : i + 1, f[3] = i > t.length - 3 ? i : i + 2, h = t[f[0]], l = t[f[1]], c = t[f[2]], u = t[f[3]], o = n * n, s = n * o, p[0] = a(h[0], l[0], c[0], u[0], n, o, s), p[1] = a(h[1], l[1], c[1], u[1], n, o, s), p[2] = a(h[2], l[2], c[2], u[2], n, o, s), p
                        },
                        a = function(t, e, r, i, n, o, a) {
                            var s = .5 * (r - t),
                                h = .5 * (i - e);
                            return (2 * (e - r) + s + h) * a + (-3 * (e - r) - 2 * s - h) * o + s * n + e
                        };
                    return function(a) {
                        if (this.isPlaying !== !1 && (this.currentTime += a * this.timeScale, 0 !== this.weight)) {
                            var s = this.data.length;
                            (this.currentTime > s || this.currentTime < 0) && (this.loop ? (this.currentTime %= s, this.currentTime < 0 && (this.currentTime += s), this.reset()) : this.stop());
                            for (var h = 0, l = this.hierarchy.length; h < l; h++)
                                for (var c = this.hierarchy[h], u = c.animationCache.animations[this.data.name], f = c.animationCache.blending, p = 0; p < 3; p++) {
                                    var d = this.keyTypes[p],
                                        m = u.prevKey[d],
                                        g = u.nextKey[d];
                                    if (this.timeScale > 0 && g.time <= this.currentTime || this.timeScale < 0 && m.time >= this.currentTime) {
                                        for (m = this.data.hierarchy[h].keys[0], g = this.getNextKeyWith(d, h, 1); g.time < this.currentTime && g.index > m.index;) m = g, g = this.getNextKeyWith(d, h, g.index + 1);
                                        u.prevKey[d] = m, u.nextKey[d] = g
                                    }
                                    var v = (this.currentTime - m.time) / (g.time - m.time),
                                        y = m[d],
                                        x = g[d];
                                    if (v < 0 && (v = 0), v > 1 && (v = 1), "pos" === d) {
                                        if (this.interpolationType === i.AnimationHandler.LINEAR) {
                                            r.x = y[0] + (x[0] - y[0]) * v, r.y = y[1] + (x[1] - y[1]) * v, r.z = y[2] + (x[2] - y[2]) * v;
                                            var b = this.weight / (this.weight + f.positionWeight);
                                            c.position.lerp(r, b), f.positionWeight += this.weight
                                        } else if (this.interpolationType === i.AnimationHandler.CATMULLROM || this.interpolationType === i.AnimationHandler.CATMULLROM_FORWARD) {
                                            t[0] = this.getPrevKeyWith("pos", h, m.index - 1).pos, t[1] = y, t[2] = x, t[3] = this.getNextKeyWith("pos", h, g.index + 1).pos, v = .33 * v + .33;
                                            var _ = o(t, v),
                                                b = this.weight / (this.weight + f.positionWeight);
                                            f.positionWeight += this.weight;
                                            var w = c.position;
                                            if (w.x = w.x + (_[0] - w.x) * b, w.y = w.y + (_[1] - w.y) * b, w.z = w.z + (_[2] - w.z) * b, this.interpolationType === i.AnimationHandler.CATMULLROM_FORWARD) {
                                                var M = o(t, 1.01 * v);
                                                e.set(M[0], M[1], M[2]), e.sub(w), e.y = 0, e.normalize();
                                                var S = Math.atan2(e.x, e.z);
                                                c.rotation.set(0, S, 0)
                                            }
                                        }
                                    } else if ("rot" === d)
                                        if (i.Quaternion.slerp(y, x, n, v), 0 === f.quaternionWeight) c.quaternion.copy(n), f.quaternionWeight = this.weight;
                                        else {
                                            var b = this.weight / (this.weight + f.quaternionWeight);
                                            i.Quaternion.slerp(c.quaternion, n, c.quaternion, b), f.quaternionWeight += this.weight
                                        }
                                    else if ("scl" === d) {
                                        r.x = y[0] + (x[0] - y[0]) * v, r.y = y[1] + (x[1] - y[1]) * v, r.z = y[2] + (x[2] - y[2]) * v;
                                        var b = this.weight / (this.weight + f.scaleWeight);
                                        c.scale.lerp(r, b), f.scaleWeight += this.weight
                                    }
                                }
                            return !0
                        }
                    }
                }(),
                getNextKeyWith: function(t, e, r) {
                    var n = this.data.hierarchy[e].keys;
                    for (this.interpolationType === i.AnimationHandler.CATMULLROM || this.interpolationType === i.AnimationHandler.CATMULLROM_FORWARD ? r = r < n.length - 1 ? r : n.length - 1 : r %= n.length; r < n.length; r++)
                        if (void 0 !== n[r][t]) return n[r];
                    return this.data.hierarchy[e].keys[0]
                },
                getPrevKeyWith: function(t, e, r) {
                    var n = this.data.hierarchy[e].keys;
                    for (r = this.interpolationType === i.AnimationHandler.CATMULLROM || this.interpolationType === i.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + n.length; r >= 0; r--)
                        if (void 0 !== n[r][t]) return n[r];
                    return this.data.hierarchy[e].keys[n.length - 1]
                }
            }, i.KeyFrameAnimation = function(t) {
                this.root = t.node, this.data = i.AnimationHandler.init(t), this.hierarchy = i.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, this.loop = !0;
                for (var e = 0, r = this.hierarchy.length; e < r; e++) {
                    var n = this.data.hierarchy[e].keys,
                        o = this.data.hierarchy[e].sids,
                        a = this.hierarchy[e];
                    if (n.length && o) {
                        for (var s = 0; s < o.length; s++) {
                            var h = o[s],
                                l = this.getNextKeyWith(h, e, 0);
                            l && l.apply(h)
                        }
                        a.matrixAutoUpdate = !1, this.data.hierarchy[e].node.updateMatrix(), a.matrixWorldNeedsUpdate = !0
                    }
                }
            }, i.KeyFrameAnimation.prototype = {
                constructor: i.KeyFrameAnimation,
                play: function(t) {
                    if (this.currentTime = void 0 !== t ? t : 0, this.isPlaying === !1) {
                        this.isPlaying = !0;
                        var e, r, n, o = this.hierarchy.length;
                        for (e = 0; e < o; e++) {
                            r = this.hierarchy[e], n = this.data.hierarchy[e], void 0 === n.animationCache && (n.animationCache = {}, n.animationCache.prevKey = null, n.animationCache.nextKey = null, n.animationCache.originalMatrix = r.matrix);
                            var a = this.data.hierarchy[e].keys;
                            a.length && (n.animationCache.prevKey = a[0], n.animationCache.nextKey = a[1], this.startTime = Math.min(a[0].time, this.startTime), this.endTime = Math.max(a[a.length - 1].time, this.endTime))
                        }
                        this.update(0)
                    }
                    this.isPaused = !1, i.AnimationHandler.play(this)
                },
                stop: function() {
                    this.isPlaying = !1, this.isPaused = !1, i.AnimationHandler.stop(this);
                    for (var t = 0; t < this.data.hierarchy.length; t++) {
                        var e = this.hierarchy[t],
                            r = this.data.hierarchy[t];
                        if (void 0 !== r.animationCache) {
                            var n = r.animationCache.originalMatrix;
                            n.copy(e.matrix), e.matrix = n, delete r.animationCache
                        }
                    }
                },
                update: function(t) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += t * this.timeScale;
                        var e = this.data.length;
                        this.loop === !0 && this.currentTime > e && (this.currentTime %= e), this.currentTime = Math.min(this.currentTime, e);
                        for (var r = 0, i = this.hierarchy.length; r < i; r++) {
                            var n = this.hierarchy[r],
                                o = this.data.hierarchy[r],
                                a = o.keys,
                                s = o.animationCache;
                            if (a.length) {
                                var h = s.prevKey,
                                    l = s.nextKey;
                                if (l.time <= this.currentTime) {
                                    for (; l.time < this.currentTime && l.index > h.index;) h = l, l = a[h.index + 1];
                                    s.prevKey = h, s.nextKey = l
                                }
                                l.time >= this.currentTime ? h.interpolate(l, this.currentTime) : h.interpolate(l, l.time), this.data.hierarchy[r].node.updateMatrix(), n.matrixWorldNeedsUpdate = !0
                            }
                        }
                    }
                },
                getNextKeyWith: function(t, e, r) {
                    var i = this.data.hierarchy[e].keys;
                    for (r %= i.length; r < i.length; r++)
                        if (i[r].hasTarget(t)) return i[r];
                    return i[0]
                },
                getPrevKeyWith: function(t, e, r) {
                    var i = this.data.hierarchy[e].keys;
                    for (r = r >= 0 ? r : r + i.length; r >= 0; r--)
                        if (i[r].hasTarget(t)) return i[r];
                    return i[i.length - 1]
                }
            }, i.MorphAnimation = function(t) {
                this.mesh = t, this.frames = t.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.lastFrame = 0, this.currentFrame = 0, this.isPlaying = !1
            }, i.MorphAnimation.prototype = {
                constructor: i.MorphAnimation,
                play: function() {
                    this.isPlaying = !0
                },
                pause: function() {
                    this.isPlaying = !1
                },
                update: function(t) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += t, this.loop === !0 && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration);
                        var e = this.duration / this.frames,
                            r = Math.floor(this.currentTime / e),
                            i = this.mesh.morphTargetInfluences;
                        r != this.currentFrame && (i[this.lastFrame] = 0, i[this.currentFrame] = 1, i[r] = 0, this.lastFrame = this.currentFrame, this.currentFrame = r), i[r] = this.currentTime % e / e, i[this.lastFrame] = 1 - i[r]
                    }
                }
            }, i.BoxGeometry = function(t, e, r, n, o, a) {
                function s(t, e, r, n, o, a, s, l) {
                    var c, u, f, p = h.widthSegments,
                        d = h.heightSegments,
                        m = o / 2,
                        g = a / 2,
                        v = h.vertices.length;
                    "x" === t && "y" === e || "y" === t && "x" === e ? c = "z" : "x" === t && "z" === e || "z" === t && "x" === e ? (c = "y", d = h.depthSegments) : ("z" === t && "y" === e || "y" === t && "z" === e) && (c = "x", p = h.depthSegments);
                    var y = p + 1,
                        x = d + 1,
                        b = o / p,
                        _ = a / d,
                        w = new i.Vector3;
                    for (w[c] = s > 0 ? 1 : -1, f = 0; f < x; f++)
                        for (u = 0; u < y; u++) {
                            var M = new i.Vector3;
                            M[t] = (u * b - m) * r, M[e] = (f * _ - g) * n, M[c] = s, h.vertices.push(M)
                        }
                    for (f = 0; f < d; f++)
                        for (u = 0; u < p; u++) {
                            var S = u + y * f,
                                T = u + y * (f + 1),
                                E = u + 1 + y * (f + 1),
                                C = u + 1 + y * f,
                                A = new i.Vector2(u / p, 1 - f / d),
                                L = new i.Vector2(u / p, 1 - (f + 1) / d),
                                P = new i.Vector2((u + 1) / p, 1 - (f + 1) / d),
                                R = new i.Vector2((u + 1) / p, 1 - f / d),
                                F = new i.Face3(S + v, T + v, C + v);
                            F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([A, L, R]), F = new i.Face3(T + v, E + v, C + v), F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                        }
                }
                i.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
                    width: t,
                    height: e,
                    depth: r,
                    widthSegments: n,
                    heightSegments: o,
                    depthSegments: a
                }, this.widthSegments = n || 1, this.heightSegments = o || 1, this.depthSegments = a || 1;
                var h = this,
                    l = t / 2,
                    c = e / 2,
                    u = r / 2;
                s("z", "y", -1, -1, r, e, l, 0), s("z", "y", 1, -1, r, e, -l, 1), s("x", "z", 1, 1, t, r, c, 2), s("x", "z", 1, -1, t, r, -c, 3), s("x", "y", 1, -1, t, e, u, 4), s("x", "y", -1, -1, t, e, -u, 5), this.mergeVertices()
            }, i.BoxGeometry.prototype = Object.create(i.Geometry.prototype), i.BoxGeometry.prototype.constructor = i.BoxGeometry, i.CircleGeometry = function(t, e, r, n) {
                i.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
                    radius: t,
                    segments: e,
                    thetaStart: r,
                    thetaLength: n
                }, t = t || 50, e = void 0 !== e ? Math.max(3, e) : 8, r = void 0 !== r ? r : 0, n = void 0 !== n ? n : 2 * Math.PI;
                var o, a = [],
                    s = new i.Vector3,
                    h = new i.Vector2(.5, .5);
                for (this.vertices.push(s), a.push(h), o = 0; o <= e; o++) {
                    var l = new i.Vector3,
                        c = r + o / e * n;
                    l.x = t * Math.cos(c), l.y = t * Math.sin(c), this.vertices.push(l), a.push(new i.Vector2((l.x / t + 1) / 2, (l.y / t + 1) / 2))
                }
                var u = new i.Vector3(0, 0, 1);
                for (o = 1; o <= e; o++) this.faces.push(new i.Face3(o, o + 1, 0, [u.clone(), u.clone(), u.clone()])), this.faceVertexUvs[0].push([a[o].clone(), a[o + 1].clone(), h.clone()]);
                this.computeFaceNormals(), this.boundingSphere = new i.Sphere(new i.Vector3, t)
            }, i.CircleGeometry.prototype = Object.create(i.Geometry.prototype), i.CircleGeometry.prototype.constructor = i.CircleGeometry, i.CubeGeometry = function(t, e, r, n, o, a) {
                return i.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new i.BoxGeometry(t, e, r, n, o, a)
            }, i.CylinderGeometry = function(t, e, r, n, o, a, s, h) {
                i.Geometry.call(this), this.type = "CylinderGeometry", this.parameters = {
                    radiusTop: t,
                    radiusBottom: e,
                    height: r,
                    radialSegments: n,
                    heightSegments: o,
                    openEnded: a,
                    thetaStart: s,
                    thetaLength: h
                }, t = void 0 !== t ? t : 20, e = void 0 !== e ? e : 20, r = void 0 !== r ? r : 100, n = n || 8, o = o || 1, a = void 0 !== a && a, s = void 0 !== s ? s : 0, h = void 0 !== h ? h : 2 * Math.PI;
                var l, c, u = r / 2,
                    f = [],
                    p = [];
                for (c = 0; c <= o; c++) {
                    var d = [],
                        m = [],
                        g = c / o,
                        v = g * (e - t) + t;
                    for (l = 0; l <= n; l++) {
                        var y = l / n,
                            x = new i.Vector3;
                        x.x = v * Math.sin(y * h + s), x.y = -g * r + u, x.z = v * Math.cos(y * h + s), this.vertices.push(x), d.push(this.vertices.length - 1), m.push(new i.Vector2(y, 1 - g))
                    }
                    f.push(d), p.push(m)
                }
                var b, _, w = (e - t) / r;
                for (l = 0; l < n; l++)
                    for (0 !== t ? (b = this.vertices[f[0][l]].clone(), _ = this.vertices[f[0][l + 1]].clone()) : (b = this.vertices[f[1][l]].clone(), _ = this.vertices[f[1][l + 1]].clone()), b.setY(Math.sqrt(b.x * b.x + b.z * b.z) * w).normalize(), _.setY(Math.sqrt(_.x * _.x + _.z * _.z) * w).normalize(), c = 0; c < o; c++) {
                        var M = f[c][l],
                            S = f[c + 1][l],
                            T = f[c + 1][l + 1],
                            E = f[c][l + 1],
                            C = b.clone(),
                            A = b.clone(),
                            L = _.clone(),
                            P = _.clone(),
                            R = p[c][l].clone(),
                            F = p[c + 1][l].clone(),
                            D = p[c + 1][l + 1].clone(),
                            B = p[c][l + 1].clone();
                        this.faces.push(new i.Face3(M, S, E, [C, A, P])), this.faceVertexUvs[0].push([R, F, B]), this.faces.push(new i.Face3(S, T, E, [A.clone(), L, P.clone()])), this.faceVertexUvs[0].push([F.clone(), D, B.clone()])
                    }
                if (a === !1 && t > 0)
                    for (this.vertices.push(new i.Vector3(0, u, 0)), l = 0; l < n; l++) {
                        var M = f[0][l],
                            S = f[0][l + 1],
                            T = this.vertices.length - 1,
                            C = new i.Vector3(0, 1, 0),
                            A = new i.Vector3(0, 1, 0),
                            L = new i.Vector3(0, 1, 0),
                            R = p[0][l].clone(),
                            F = p[0][l + 1].clone(),
                            D = new i.Vector2(F.x, 0);
                        this.faces.push(new i.Face3(M, S, T, [C, A, L])), this.faceVertexUvs[0].push([R, F, D])
                    }
                if (a === !1 && e > 0)
                    for (this.vertices.push(new i.Vector3(0, (-u), 0)), l = 0; l < n; l++) {
                        var M = f[o][l + 1],
                            S = f[o][l],
                            T = this.vertices.length - 1,
                            C = new i.Vector3(0, (-1), 0),
                            A = new i.Vector3(0, (-1), 0),
                            L = new i.Vector3(0, (-1), 0),
                            R = p[o][l + 1].clone(),
                            F = p[o][l].clone(),
                            D = new i.Vector2(F.x, 1);
                        this.faces.push(new i.Face3(M, S, T, [C, A, L])), this.faceVertexUvs[0].push([R, F, D])
                    }
                this.computeFaceNormals()
            }, i.CylinderGeometry.prototype = Object.create(i.Geometry.prototype), i.CylinderGeometry.prototype.constructor = i.CylinderGeometry, i.ExtrudeGeometry = function(t, e) {
                return "undefined" == typeof t ? void(t = []) : (i.Geometry.call(this), this.type = "ExtrudeGeometry", t = t instanceof Array ? t : [t], this.addShapeList(t, e), void this.computeFaceNormals())
            }, i.ExtrudeGeometry.prototype = Object.create(i.Geometry.prototype);
        i.ExtrudeGeometry.prototype.constructor = i.ExtrudeGeometry;
        i.ExtrudeGeometry.prototype.addShapeList = function(t, e) {
            for (var r = t.length, i = 0; i < r; i++) {
                var n = t[i];
                this.addShape(n, e)
            }
        }, i.ExtrudeGeometry.prototype.addShape = function(t, e) {
            function r(t, e, r) {
                return e || i.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(r).add(t)
            }

            function n(t, e, r) {
                var n, o, a = 1e-10,
                    s = 1,
                    h = t.x - e.x,
                    l = t.y - e.y,
                    c = r.x - t.x,
                    u = r.y - t.y,
                    f = h * h + l * l,
                    p = h * u - l * c;
                if (Math.abs(p) > a) {
                    var d = Math.sqrt(f),
                        m = Math.sqrt(c * c + u * u),
                        g = e.x - l / d,
                        v = e.y + h / d,
                        y = r.x - u / m,
                        x = r.y + c / m,
                        b = ((y - g) * u - (x - v) * c) / (h * u - l * c);
                    n = g + h * b - t.x, o = v + l * b - t.y;
                    var _ = n * n + o * o;
                    if (_ <= 2) return new i.Vector2(n, o);
                    s = Math.sqrt(_ / 2)
                } else {
                    var w = !1;
                    h > a ? c > a && (w = !0) : h < -a ? c < -a && (w = !0) : Math.sign(l) == Math.sign(u) && (w = !0), w ? (n = -l, o = h, s = Math.sqrt(f)) : (n = h, o = l, s = Math.sqrt(f / 2))
                }
                return new i.Vector2(n / s, o / s)
            }

            function o() {
                if (b) {
                    var t = 0,
                        e = j * t;
                    for (Y = 0; Y < X; Y++) W = O[Y], l(W[2] + e, W[1] + e, W[0] + e);
                    for (t = w + 2 * x, e = j * t, Y = 0; Y < X; Y++) W = O[Y], l(W[0] + e, W[1] + e, W[2] + e)
                } else {
                    for (Y = 0; Y < X; Y++) W = O[Y], l(W[2], W[1], W[0]);
                    for (Y = 0; Y < X; Y++) W = O[Y], l(W[0] + j * w, W[1] + j * w, W[2] + j * w)
                }
            }

            function a() {
                var t = 0;
                for (s(z, t), t += z.length, L = 0, P = U.length; L < P; L++) A = U[L], s(A, t), t += A.length
            }

            function s(t, e) {
                var r, i;
                for (Y = t.length; --Y >= 0;) {
                    r = Y, i = Y - 1, i < 0 && (i = t.length - 1);
                    var n = 0,
                        o = w + 2 * x;
                    for (n = 0; n < o; n++) {
                        var a = j * n,
                            s = j * (n + 1),
                            h = e + r + a,
                            l = e + i + a,
                            u = e + i + s,
                            f = e + r + s;
                        c(h, l, u, f, t, n, o, r, i)
                    }
                }
            }

            function h(t, e, r) {
                R.vertices.push(new i.Vector3(t, e, r))
            }

            function l(t, e, r) {
                t += F, e += F, r += F, R.faces.push(new i.Face3(t, e, r, null, null, T));
                var n = C.generateTopUV(R, t, e, r);
                R.faceVertexUvs[0].push(n)
            }

            function c(t, e, r, n, o, a, s, h, l) {
                t += F, e += F, r += F, n += F, R.faces.push(new i.Face3(t, e, n, null, null, E)), R.faces.push(new i.Face3(e, r, n, null, null, E));
                var c = C.generateSideWallUV(R, t, e, r, n);
                R.faceVertexUvs[0].push([c[0], c[1], c[3]]), R.faceVertexUvs[0].push([c[1], c[2], c[3]])
            }
            var u, f, p, d, m, g = void 0 !== e.amount ? e.amount : 100,
                v = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
                y = void 0 !== e.bevelSize ? e.bevelSize : v - 2,
                x = void 0 !== e.bevelSegments ? e.bevelSegments : 3,
                b = void 0 === e.bevelEnabled || e.bevelEnabled,
                _ = void 0 !== e.curveSegments ? e.curveSegments : 12,
                w = void 0 !== e.steps ? e.steps : 1,
                M = e.extrudePath,
                S = !1,
                T = e.material,
                E = e.extrudeMaterial,
                C = void 0 !== e.UVGenerator ? e.UVGenerator : i.ExtrudeGeometry.WorldUVGenerator;
            M && (u = M.getSpacedPoints(w), S = !0, b = !1, f = void 0 !== e.frames ? e.frames : new i.TubeGeometry.FrenetFrames(M, w, (!1)), p = new i.Vector3, d = new i.Vector3, m = new i.Vector3), b || (x = 0, v = 0, y = 0);
            var A, L, P, R = this,
                F = this.vertices.length,
                D = t.extractPoints(_),
                B = D.shape,
                U = D.holes,
                V = !i.Shape.Utils.isClockWise(B);
            if (V) {
                for (B = B.reverse(), L = 0, P = U.length; L < P; L++) A = U[L], i.Shape.Utils.isClockWise(A) && (U[L] = A.reverse());
                V = !1
            }
            var O = i.Shape.Utils.triangulateShape(B, U),
                z = B;
            for (L = 0, P = U.length; L < P; L++) A = U[L], B = B.concat(A);
            for (var k, N, I, G, H, W, j = B.length, X = O.length, q = [], Y = 0, K = z.length, Q = K - 1, Z = Y + 1; Y < K; Y++, Q++, Z++) Q === K && (Q = 0), Z === K && (Z = 0), q[Y] = n(z[Y], z[Q], z[Z]);
            var $, J = [],
                tt = q.concat();
            for (L = 0, P = U.length; L < P; L++) {
                for (A = U[L], $ = [], Y = 0, K = A.length, Q = K - 1, Z = Y + 1; Y < K; Y++, Q++, Z++) Q === K && (Q = 0), Z === K && (Z = 0), $[Y] = n(A[Y], A[Q], A[Z]);
                J.push($), tt = tt.concat($)
            }
            for (k = 0; k < x; k++) {
                for (I = k / x, G = v * (1 - I), N = y * Math.sin(I * Math.PI / 2), Y = 0, K = z.length; Y < K; Y++) H = r(z[Y], q[Y], N), h(H.x, H.y, -G);
                for (L = 0, P = U.length; L < P; L++)
                    for (A = U[L], $ = J[L], Y = 0, K = A.length; Y < K; Y++) H = r(A[Y], $[Y], N), h(H.x, H.y, -G)
            }
            for (N = y, Y = 0; Y < j; Y++) H = b ? r(B[Y], tt[Y], N) : B[Y], S ? (d.copy(f.normals[0]).multiplyScalar(H.x), p.copy(f.binormals[0]).multiplyScalar(H.y), m.copy(u[0]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, 0);
            var et;
            for (et = 1; et <= w; et++)
                for (Y = 0; Y < j; Y++) H = b ? r(B[Y], tt[Y], N) : B[Y], S ? (d.copy(f.normals[et]).multiplyScalar(H.x), p.copy(f.binormals[et]).multiplyScalar(H.y), m.copy(u[et]).add(d).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, g / w * et);
            for (k = x - 1; k >= 0; k--) {
                for (I = k / x, G = v * (1 - I), N = y * Math.sin(I * Math.PI / 2), Y = 0, K = z.length; Y < K; Y++) H = r(z[Y], q[Y], N), h(H.x, H.y, g + G);
                for (L = 0, P = U.length; L < P; L++)
                    for (A = U[L], $ = J[L], Y = 0, K = A.length; Y < K; Y++) H = r(A[Y], $[Y], N), S ? h(H.x, H.y + u[w - 1].y, u[w - 1].x + G) : h(H.x, H.y, g + G)
            }
            o(), a()
        }, i.ExtrudeGeometry.WorldUVGenerator = {
            generateTopUV: function(t, e, r, n) {
                var o = t.vertices,
                    a = o[e],
                    s = o[r],
                    h = o[n];
                return [new i.Vector2(a.x, a.y), new i.Vector2(s.x, s.y), new i.Vector2(h.x, h.y)]
            },
            generateSideWallUV: function(t, e, r, n, o) {
                var a = t.vertices,
                    s = a[e],
                    h = a[r],
                    l = a[n],
                    c = a[o];
                return Math.abs(s.y - h.y) < .01 ? [new i.Vector2(s.x, 1 - s.z), new i.Vector2(h.x, 1 - h.z), new i.Vector2(l.x, 1 - l.z), new i.Vector2(c.x, 1 - c.z)] : [new i.Vector2(s.y, 1 - s.z), new i.Vector2(h.y, 1 - h.z), new i.Vector2(l.y, 1 - l.z), new i.Vector2(c.y, 1 - c.z)]
            }
        }, i.ShapeGeometry = function(t, e) {
            i.Geometry.call(this), this.type = "ShapeGeometry", t instanceof Array == !1 && (t = [t]), this.addShapeList(t, e), this.computeFaceNormals()
        }, i.ShapeGeometry.prototype = Object.create(i.Geometry.prototype), i.ShapeGeometry.prototype.constructor = i.ShapeGeometry, i.ShapeGeometry.prototype.addShapeList = function(t, e) {
            for (var r = 0, i = t.length; r < i; r++) this.addShape(t[r], e);
            return this
        }, i.ShapeGeometry.prototype.addShape = function(t, e) {
            void 0 === e && (e = {});
            var r, n, o, a = void 0 !== e.curveSegments ? e.curveSegments : 12,
                s = e.material,
                h = void 0 === e.UVGenerator ? i.ExtrudeGeometry.WorldUVGenerator : e.UVGenerator,
                l = this.vertices.length,
                c = t.extractPoints(a),
                u = c.shape,
                f = c.holes,
                p = !i.Shape.Utils.isClockWise(u);
            if (p) {
                for (u = u.reverse(), r = 0, n = f.length; r < n; r++) o = f[r], i.Shape.Utils.isClockWise(o) && (f[r] = o.reverse());
                p = !1
            }
            var d = i.Shape.Utils.triangulateShape(u, f);
            for (r = 0, n = f.length; r < n; r++) o = f[r], u = u.concat(o);
            var m, g, v = u.length,
                y = d.length;
            for (r = 0; r < v; r++) m = u[r], this.vertices.push(new i.Vector3(m.x, m.y, 0));
            for (r = 0; r < y; r++) {
                g = d[r];
                var x = g[0] + l,
                    b = g[1] + l,
                    _ = g[2] + l;
                this.faces.push(new i.Face3(x, b, _, null, null, s)), this.faceVertexUvs[0].push(h.generateTopUV(this, x, b, _))
            }
        }, i.LatheGeometry = function(t, e, r, n) {
            i.Geometry.call(this), this.type = "LatheGeometry", this.parameters = {
                points: t,
                segments: e,
                phiStart: r,
                phiLength: n
            }, e = e || 12, r = r || 0, n = n || 2 * Math.PI;
            for (var o = 1 / (t.length - 1), a = 1 / e, s = 0, h = e; s <= h; s++)
                for (var l = r + s * a * n, c = Math.cos(l), u = Math.sin(l), f = 0, p = t.length; f < p; f++) {
                    var d = t[f],
                        m = new i.Vector3;
                    m.x = c * d.x - u * d.y, m.y = u * d.x + c * d.y, m.z = d.z, this.vertices.push(m)
                }
            for (var g = t.length, s = 0, h = e; s < h; s++)
                for (var f = 0, p = t.length - 1; f < p; f++) {
                    var v = f + g * s,
                        y = v,
                        x = v + g,
                        c = v + 1 + g,
                        b = v + 1,
                        _ = s * a,
                        w = f * o,
                        M = _ + a,
                        S = w + o;
                    this.faces.push(new i.Face3(y, x, b)), this.faceVertexUvs[0].push([new i.Vector2(_, w), new i.Vector2(M, w), new i.Vector2(_, S)]), this.faces.push(new i.Face3(x, c, b)), this.faceVertexUvs[0].push([new i.Vector2(M, w), new i.Vector2(M, S), new i.Vector2(_, S)])
                }
            this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
        }, i.LatheGeometry.prototype = Object.create(i.Geometry.prototype), i.LatheGeometry.prototype.constructor = i.LatheGeometry, i.PlaneGeometry = function(t, e, r, n) {
            console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint."), i.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
                width: t,
                height: e,
                widthSegments: r,
                heightSegments: n
            }, this.fromBufferGeometry(new i.PlaneBufferGeometry(t, e, r, n))
        }, i.PlaneGeometry.prototype = Object.create(i.Geometry.prototype), i.PlaneGeometry.prototype.constructor = i.PlaneGeometry, i.PlaneBufferGeometry = function(t, e, r, n) {
            i.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                width: t,
                height: e,
                widthSegments: r,
                heightSegments: n
            };
            for (var o = t / 2, a = e / 2, s = r || 1, h = n || 1, l = s + 1, c = h + 1, u = t / s, f = e / h, p = new Float32Array(l * c * 3), d = new Float32Array(l * c * 3), m = new Float32Array(l * c * 2), g = 0, v = 0, y = 0; y < c; y++)
                for (var x = y * f - a, b = 0; b < l; b++) {
                    var _ = b * u - o;
                    p[g] = _, p[g + 1] = -x, d[g + 2] = 1, m[v] = b / s, m[v + 1] = 1 - y / h, g += 3, v += 2
                }
            g = 0;
            for (var w = new(p.length / 3 > 65535 ? Uint32Array : Uint16Array)(s * h * 6), y = 0; y < h; y++)
                for (var b = 0; b < s; b++) {
                    var M = b + l * y,
                        S = b + l * (y + 1),
                        T = b + 1 + l * (y + 1),
                        E = b + 1 + l * y;
                    w[g] = M, w[g + 1] = S, w[g + 2] = E, w[g + 3] = S, w[g + 4] = T, w[g + 5] = E, g += 6
                }
            this.addAttribute("index", new i.BufferAttribute(w, 1)), this.addAttribute("position", new i.BufferAttribute(p, 3)), this.addAttribute("normal", new i.BufferAttribute(d, 3)), this.addAttribute("uv", new i.BufferAttribute(m, 2))
        }, i.PlaneBufferGeometry.prototype = Object.create(i.BufferGeometry.prototype), i.PlaneBufferGeometry.prototype.constructor = i.PlaneBufferGeometry, i.RingGeometry = function(t, e, r, n, o, a) {
            i.Geometry.call(this), this.type = "RingGeometry", this.parameters = {
                innerRadius: t,
                outerRadius: e,
                thetaSegments: r,
                phiSegments: n,
                thetaStart: o,
                thetaLength: a
            }, t = t || 0, e = e || 50, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : 2 * Math.PI, r = void 0 !== r ? Math.max(3, r) : 8, n = void 0 !== n ? Math.max(1, n) : 8;
            var s, h, l = [],
                c = t,
                u = (e - t) / n;
            for (s = 0; s < n + 1; s++) {
                for (h = 0; h < r + 1; h++) {
                    var f = new i.Vector3,
                        p = o + h / r * a;
                    f.x = c * Math.cos(p), f.y = c * Math.sin(p), this.vertices.push(f), l.push(new i.Vector2((f.x / e + 1) / 2, (f.y / e + 1) / 2))
                }
                c += u
            }
            var d = new i.Vector3(0, 0, 1);
            for (s = 0; s < n; s++) {
                var m = s * (r + 1);
                for (h = 0; h < r; h++) {
                    var p = h + m,
                        g = p,
                        v = p + r + 1,
                        y = p + r + 2;
                    this.faces.push(new i.Face3(g, v, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[g].clone(), l[v].clone(), l[y].clone()]), g = p, v = p + r + 2, y = p + 1, this.faces.push(new i.Face3(g, v, y, [d.clone(), d.clone(), d.clone()])), this.faceVertexUvs[0].push([l[g].clone(), l[v].clone(), l[y].clone()])
                }
            }
            this.computeFaceNormals(), this.boundingSphere = new i.Sphere(new i.Vector3, c)
        }, i.RingGeometry.prototype = Object.create(i.Geometry.prototype), i.RingGeometry.prototype.constructor = i.RingGeometry, i.SphereGeometry = function(t, e, r, n, o, a, s) {
            i.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
                radius: t,
                widthSegments: e,
                heightSegments: r,
                phiStart: n,
                phiLength: o,
                thetaStart: a,
                thetaLength: s
            }, t = t || 50, e = Math.max(3, Math.floor(e) || 8), r = Math.max(2, Math.floor(r) || 6), n = void 0 !== n ? n : 0, o = void 0 !== o ? o : 2 * Math.PI, a = void 0 !== a ? a : 0, s = void 0 !== s ? s : Math.PI;
            var h, l, c = [],
                u = [];
            for (l = 0; l <= r; l++) {
                var f = [],
                    p = [];
                for (h = 0; h <= e; h++) {
                    var d = h / e,
                        m = l / r,
                        g = new i.Vector3;
                    g.x = -t * Math.cos(n + d * o) * Math.sin(a + m * s), g.y = t * Math.cos(a + m * s), g.z = t * Math.sin(n + d * o) * Math.sin(a + m * s), this.vertices.push(g), f.push(this.vertices.length - 1), p.push(new i.Vector2(d, 1 - m))
                }
                c.push(f), u.push(p)
            }
            for (l = 0; l < r; l++)
                for (h = 0; h < e; h++) {
                    var v = c[l][h + 1],
                        y = c[l][h],
                        x = c[l + 1][h],
                        b = c[l + 1][h + 1],
                        _ = this.vertices[v].clone().normalize(),
                        w = this.vertices[y].clone().normalize(),
                        M = this.vertices[x].clone().normalize(),
                        S = this.vertices[b].clone().normalize(),
                        T = u[l][h + 1].clone(),
                        E = u[l][h].clone(),
                        C = u[l + 1][h].clone(),
                        A = u[l + 1][h + 1].clone();
                    Math.abs(this.vertices[v].y) === t ? (T.x = (T.x + E.x) / 2, this.faces.push(new i.Face3(v, x, b, [_, M, S])), this.faceVertexUvs[0].push([T, C, A])) : Math.abs(this.vertices[x].y) === t ? (C.x = (C.x + A.x) / 2, this.faces.push(new i.Face3(v, y, x, [_, w, M])), this.faceVertexUvs[0].push([T, E, C])) : (this.faces.push(new i.Face3(v, y, b, [_, w, S])), this.faceVertexUvs[0].push([T, E, A]), this.faces.push(new i.Face3(y, x, b, [w.clone(), M, S.clone()])), this.faceVertexUvs[0].push([E.clone(), C, A.clone()]))
                }
            this.computeFaceNormals(), this.boundingSphere = new i.Sphere(new i.Vector3, t)
        }, i.SphereGeometry.prototype = Object.create(i.Geometry.prototype), i.SphereGeometry.prototype.constructor = i.SphereGeometry, i.TextGeometry = function(t, e) {
            e = e || {};
            var r = i.FontUtils.generateShapes(t, e);
            e.amount = void 0 !== e.height ? e.height : 50, void 0 === e.bevelThickness && (e.bevelThickness = 10), void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), i.ExtrudeGeometry.call(this, r, e), this.type = "TextGeometry"
        }, i.TextGeometry.prototype = Object.create(i.ExtrudeGeometry.prototype), i.TextGeometry.prototype.constructor = i.TextGeometry, i.TorusGeometry = function(t, e, r, n, o) {
            i.Geometry.call(this), this.type = "TorusGeometry", this.parameters = {
                radius: t,
                tube: e,
                radialSegments: r,
                tubularSegments: n,
                arc: o
            }, t = t || 100, e = e || 40, r = r || 8, n = n || 6, o = o || 2 * Math.PI;
            for (var a = new i.Vector3, s = [], h = [], l = 0; l <= r; l++)
                for (var c = 0; c <= n; c++) {
                    var u = c / n * o,
                        f = l / r * Math.PI * 2;
                    a.x = t * Math.cos(u), a.y = t * Math.sin(u);
                    var p = new i.Vector3;
                    p.x = (t + e * Math.cos(f)) * Math.cos(u), p.y = (t + e * Math.cos(f)) * Math.sin(u), p.z = e * Math.sin(f), this.vertices.push(p), s.push(new i.Vector2(c / n, l / r)), h.push(p.clone().sub(a).normalize())
                }
            for (var l = 1; l <= r; l++)
                for (var c = 1; c <= n; c++) {
                    var d = (n + 1) * l + c - 1,
                        m = (n + 1) * (l - 1) + c - 1,
                        g = (n + 1) * (l - 1) + c,
                        v = (n + 1) * l + c,
                        y = new i.Face3(d, m, v, [h[d].clone(), h[m].clone(), h[v].clone()]);
                    this.faces.push(y), this.faceVertexUvs[0].push([s[d].clone(), s[m].clone(), s[v].clone()]), y = new i.Face3(m, g, v, [h[m].clone(), h[g].clone(), h[v].clone()]), this.faces.push(y), this.faceVertexUvs[0].push([s[m].clone(), s[g].clone(), s[v].clone()])
                }
            this.computeFaceNormals()
        }, i.TorusGeometry.prototype = Object.create(i.Geometry.prototype), i.TorusGeometry.prototype.constructor = i.TorusGeometry, i.TorusKnotGeometry = function(t, e, r, n, o, a, s) {
            function h(t, e, r, n, o) {
                var a = Math.cos(t),
                    s = Math.sin(t),
                    h = e / r * t,
                    l = Math.cos(h),
                    c = n * (2 + l) * .5 * a,
                    u = n * (2 + l) * s * .5,
                    f = o * n * Math.sin(h) * .5;
                return new i.Vector3(c, u, f)
            }
            i.Geometry.call(this), this.type = "TorusKnotGeometry", this.parameters = {
                radius: t,
                tube: e,
                radialSegments: r,
                tubularSegments: n,
                p: o,
                q: a,
                heightScale: s
            }, t = t || 100, e = e || 40, r = r || 64, n = n || 8, o = o || 2, a = a || 3, s = s || 1;
            for (var l = new Array(r), c = new i.Vector3, u = new i.Vector3, f = new i.Vector3, p = 0; p < r; ++p) {
                l[p] = new Array(n);
                var d = p / r * 2 * o * Math.PI,
                    m = h(d, a, o, t, s),
                    g = h(d + .01, a, o, t, s);
                c.subVectors(g, m), u.addVectors(g, m), f.crossVectors(c, u), u.crossVectors(f, c), f.normalize(), u.normalize();
                for (var v = 0; v < n; ++v) {
                    var y = v / n * 2 * Math.PI,
                        x = -e * Math.cos(y),
                        b = e * Math.sin(y),
                        _ = new i.Vector3;
                    _.x = m.x + x * u.x + b * f.x, _.y = m.y + x * u.y + b * f.y, _.z = m.z + x * u.z + b * f.z, l[p][v] = this.vertices.push(_) - 1
                }
            }
            for (var p = 0; p < r; ++p)
                for (var v = 0; v < n; ++v) {
                    var w = (p + 1) % r,
                        M = (v + 1) % n,
                        S = l[p][v],
                        T = l[w][v],
                        E = l[w][M],
                        C = l[p][M],
                        A = new i.Vector2(p / r, v / n),
                        L = new i.Vector2((p + 1) / r, v / n),
                        P = new i.Vector2((p + 1) / r, (v + 1) / n),
                        R = new i.Vector2(p / r, (v + 1) / n);
                    this.faces.push(new i.Face3(S, T, C)), this.faceVertexUvs[0].push([A, L, R]), this.faces.push(new i.Face3(T, E, C)), this.faceVertexUvs[0].push([L.clone(), P, R.clone()])
                }
            this.computeFaceNormals(), this.computeVertexNormals()
        }, i.TorusKnotGeometry.prototype = Object.create(i.Geometry.prototype), i.TorusKnotGeometry.prototype.constructor = i.TorusKnotGeometry, i.TubeGeometry = function(t, e, r, n, o, a) {
            function s(t, e, r) {
                return P.vertices.push(new i.Vector3(t, e, r)) - 1
            }
            i.Geometry.call(this), this.type = "TubeGeometry", this.parameters = {
                path: t,
                segments: e,
                radius: r,
                radialSegments: n,
                closed: o
            }, e = e || 64, r = r || 1, n = n || 8, o = o || !1, a = a || i.TubeGeometry.NoTaper;
            var h, l, c, u, f, p, d, m, g, v, y, x, b, _, w, M, S, T, E, C, A, L = [],
                P = this,
                R = e + 1,
                F = new i.Vector3,
                D = new i.TubeGeometry.FrenetFrames(t, e, o),
                B = D.tangents,
                U = D.normals,
                V = D.binormals;
            for (this.tangents = B, this.normals = U, this.binormals = V, v = 0; v < R; v++)
                for (L[v] = [], u = v / (R - 1), g = t.getPointAt(u), h = B[v], l = U[v], c = V[v], p = r * a(u), y = 0; y < n; y++) f = y / n * 2 * Math.PI, d = -p * Math.cos(f), m = p * Math.sin(f), F.copy(g), F.x += d * l.x + m * c.x, F.y += d * l.y + m * c.y, F.z += d * l.z + m * c.z, L[v][y] = s(F.x, F.y, F.z);
            for (v = 0; v < e; v++)
                for (y = 0; y < n; y++) x = o ? (v + 1) % e : v + 1, b = (y + 1) % n, _ = L[v][y], w = L[x][y], M = L[x][b], S = L[v][b], T = new i.Vector2(v / e, y / n), E = new i.Vector2((v + 1) / e, y / n), C = new i.Vector2((v + 1) / e, (y + 1) / n), A = new i.Vector2(v / e, (y + 1) / n), this.faces.push(new i.Face3(_, w, S)), this.faceVertexUvs[0].push([T, E, A]), this.faces.push(new i.Face3(w, M, S)), this.faceVertexUvs[0].push([E.clone(), C, A.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, i.TubeGeometry.prototype = Object.create(i.Geometry.prototype), i.TubeGeometry.prototype.constructor = i.TubeGeometry, i.TubeGeometry.NoTaper = function(t) {
            return 1
        }, i.TubeGeometry.SinusoidalTaper = function(t) {
            return Math.sin(Math.PI * t)
        }, i.TubeGeometry.FrenetFrames = function(t, e, r) {
            function n() {
                d[0] = new i.Vector3, m[0] = new i.Vector3, a = Number.MAX_VALUE, s = Math.abs(p[0].x), h = Math.abs(p[0].y), l = Math.abs(p[0].z), s <= a && (a = s, f.set(1, 0, 0)), h <= a && (a = h, f.set(0, 1, 0)), l <= a && f.set(0, 0, 1), g.crossVectors(p[0], f).normalize(), d[0].crossVectors(p[0], g), m[0].crossVectors(p[0], d[0])
            }
            var o, a, s, h, l, c, u, f = new i.Vector3,
                p = [],
                d = [],
                m = [],
                g = new i.Vector3,
                v = new i.Matrix4,
                y = e + 1,
                x = 1e-4;
            for (this.tangents = p, this.normals = d, this.binormals = m, c = 0; c < y; c++) u = c / (y - 1), p[c] = t.getTangentAt(u), p[c].normalize();
            for (n(), c = 1; c < y; c++) d[c] = d[c - 1].clone(), m[c] = m[c - 1].clone(), g.crossVectors(p[c - 1], p[c]), g.length() > x && (g.normalize(), o = Math.acos(i.Math.clamp(p[c - 1].dot(p[c]), -1, 1)), d[c].applyMatrix4(v.makeRotationAxis(g, o))), m[c].crossVectors(p[c], d[c]);
            if (r)
                for (o = Math.acos(i.Math.clamp(d[0].dot(d[y - 1]), -1, 1)), o /= y - 1, p[0].dot(g.crossVectors(d[0], d[y - 1])) > 0 && (o = -o), c = 1; c < y; c++) d[c].applyMatrix4(v.makeRotationAxis(p[c], o * c)), m[c].crossVectors(p[c], d[c])
        }, i.PolyhedronGeometry = function(t, e, r, n) {
            function o(t) {
                var e = t.normalize().clone();
                e.index = u.vertices.push(e) - 1;
                var r = h(t) / 2 / Math.PI + .5,
                    n = l(t) / Math.PI + .5;
                return e.uv = new i.Vector2(r, 1 - n), e
            }

            function a(t, e, r) {
                var n = new i.Face3(t.index, e.index, r.index, [t.clone(), e.clone(), r.clone()]);
                u.faces.push(n), b.copy(t).add(e).add(r).divideScalar(3);
                var o = h(b);
                u.faceVertexUvs[0].push([c(t.uv, t, o), c(e.uv, e, o), c(r.uv, r, o)])
            }

            function s(t, e) {
                for (var r = Math.pow(2, e), i = o(u.vertices[t.a]), n = o(u.vertices[t.b]), s = o(u.vertices[t.c]), h = [], l = 0; l <= r; l++) {
                    h[l] = [];
                    for (var c = o(i.clone().lerp(s, l / r)), f = o(n.clone().lerp(s, l / r)), p = r - l, d = 0; d <= p; d++) 0 == d && l == r ? h[l][d] = c : h[l][d] = o(c.clone().lerp(f, d / p))
                }
                for (var l = 0; l < r; l++)
                    for (var d = 0; d < 2 * (r - l) - 1; d++) {
                        var m = Math.floor(d / 2);
                        d % 2 == 0 ? a(h[l][m + 1], h[l + 1][m], h[l][m]) : a(h[l][m + 1], h[l + 1][m + 1], h[l + 1][m])
                    }
            }

            function h(t) {
                return Math.atan2(t.z, -t.x)
            }

            function l(t) {
                return Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z))
            }

            function c(t, e, r) {
                return r < 0 && 1 === t.x && (t = new i.Vector2(t.x - 1, t.y)), 0 === e.x && 0 === e.z && (t = new i.Vector2(r / 2 / Math.PI + .5, t.y)), t.clone()
            }
            i.Geometry.call(this), this.type = "PolyhedronGeometry", this.parameters = {
                vertices: t,
                indices: e,
                radius: r,
                detail: n
            }, r = r || 1, n = n || 0;
            for (var u = this, f = 0, p = t.length; f < p; f += 3) o(new i.Vector3(t[f], t[f + 1], t[f + 2]));
            for (var d = this.vertices, m = [], f = 0, g = 0, p = e.length; f < p; f += 3, g++) {
                var v = d[e[f]],
                    y = d[e[f + 1]],
                    x = d[e[f + 2]];
                m[g] = new i.Face3(v.index, y.index, x.index, [v.clone(), y.clone(), x.clone()])
            }
            for (var b = new i.Vector3, f = 0, p = m.length; f < p; f++) s(m[f], n);
            for (var f = 0, p = this.faceVertexUvs[0].length; f < p; f++) {
                var _ = this.faceVertexUvs[0][f],
                    w = _[0].x,
                    M = _[1].x,
                    S = _[2].x,
                    T = Math.max(w, Math.max(M, S)),
                    E = Math.min(w, Math.min(M, S));
                T > .9 && E < .1 && (w < .2 && (_[0].x += 1), M < .2 && (_[1].x += 1), S < .2 && (_[2].x += 1))
            }
            for (var f = 0, p = this.vertices.length; f < p; f++) this.vertices[f].multiplyScalar(r);
            this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new i.Sphere(new i.Vector3, r)
        }, i.PolyhedronGeometry.prototype = Object.create(i.Geometry.prototype), i.PolyhedronGeometry.prototype.constructor = i.PolyhedronGeometry, i.DodecahedronGeometry = function(t, e) {
            this.parameters = {
                radius: t,
                detail: e
            };
            var r = (1 + Math.sqrt(5)) / 2,
                n = 1 / r,
                o = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -n, -r, 0, -n, r, 0, n, -r, 0, n, r, -n, -r, 0, -n, r, 0, n, -r, 0, n, r, 0, -r, 0, -n, r, 0, -n, -r, 0, n, r, 0, n],
                a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
            i.PolyhedronGeometry.call(this, o, a, t, e)
        }, i.DodecahedronGeometry.prototype = Object.create(i.Geometry.prototype), i.DodecahedronGeometry.prototype.constructor = i.DodecahedronGeometry, i.IcosahedronGeometry = function(t, e) {
            var r = (1 + Math.sqrt(5)) / 2,
                n = [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1],
                o = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
            i.PolyhedronGeometry.call(this, n, o, t, e), this.type = "IcosahedronGeometry", this.parameters = {
                radius: t,
                detail: e
            }
        }, i.IcosahedronGeometry.prototype = Object.create(i.Geometry.prototype), i.IcosahedronGeometry.prototype.constructor = i.IcosahedronGeometry, i.OctahedronGeometry = function(t, e) {
            this.parameters = {
                radius: t,
                detail: e
            };
            var r = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
                n = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
            i.PolyhedronGeometry.call(this, r, n, t, e), this.type = "OctahedronGeometry", this.parameters = {
                radius: t,
                detail: e
            }
        }, i.OctahedronGeometry.prototype = Object.create(i.Geometry.prototype), i.OctahedronGeometry.prototype.constructor = i.OctahedronGeometry, i.TetrahedronGeometry = function(t, e) {
            var r = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
                n = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
            i.PolyhedronGeometry.call(this, r, n, t, e), this.type = "TetrahedronGeometry", this.parameters = {
                radius: t,
                detail: e
            }
        }, i.TetrahedronGeometry.prototype = Object.create(i.Geometry.prototype), i.TetrahedronGeometry.prototype.constructor = i.TetrahedronGeometry, i.ParametricGeometry = function(t, e, r) {
            i.Geometry.call(this), this.type = "ParametricGeometry", this.parameters = {
                func: t,
                slices: e,
                stacks: r
            };
            var n, o, a, s, h, l = this.vertices,
                c = this.faces,
                u = this.faceVertexUvs[0],
                f = e + 1;
            for (n = 0; n <= r; n++)
                for (h = n / r, o = 0; o <= e; o++) s = o / e, a = t(s, h), l.push(a);
            var p, d, m, g, v, y, x, b;
            for (n = 0; n < r; n++)
                for (o = 0; o < e; o++) p = n * f + o, d = n * f + o + 1, m = (n + 1) * f + o + 1, g = (n + 1) * f + o, v = new i.Vector2(o / e, n / r), y = new i.Vector2((o + 1) / e, n / r), x = new i.Vector2((o + 1) / e, (n + 1) / r), b = new i.Vector2(o / e, (n + 1) / r), c.push(new i.Face3(p, d, g)), u.push([v, y, b]), c.push(new i.Face3(d, m, g)), u.push([y.clone(), x, b.clone()]);
            this.computeFaceNormals(), this.computeVertexNormals()
        }, i.ParametricGeometry.prototype = Object.create(i.Geometry.prototype), i.ParametricGeometry.prototype.constructor = i.ParametricGeometry, i.AxisHelper = function(t) {
            t = t || 1;
            var e = new Float32Array([0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t]),
                r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]),
                n = new i.BufferGeometry;
            n.addAttribute("position", new i.BufferAttribute(e, 3)), n.addAttribute("color", new i.BufferAttribute(r, 3));
            var o = new i.LineBasicMaterial({
                vertexColors: i.VertexColors
            });
            i.Line.call(this, n, o, i.LinePieces)
        }, i.AxisHelper.prototype = Object.create(i.Line.prototype), i.AxisHelper.prototype.constructor = i.AxisHelper, i.ArrowHelper = function() {
            var t = new i.Geometry;
            t.vertices.push(new i.Vector3(0, 0, 0), new i.Vector3(0, 1, 0));
            var e = new i.CylinderGeometry(0, .5, 1, 5, 1);
            return e.applyMatrix((new i.Matrix4).makeTranslation(0, -.5, 0)),
                function(r, n, o, a, s, h) {
                    i.Object3D.call(this), void 0 === a && (a = 16776960), void 0 === o && (o = 1), void 0 === s && (s = .2 * o), void 0 === h && (h = .2 * s), this.position.copy(n), this.line = new i.Line(t, new i.LineBasicMaterial({
                        color: a
                    })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new i.Mesh(e, new i.MeshBasicMaterial({
                        color: a
                    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(r), this.setLength(o, s, h)
                }
        }(), i.ArrowHelper.prototype = Object.create(i.Object3D.prototype), i.ArrowHelper.prototype.constructor = i.ArrowHelper, i.ArrowHelper.prototype.setDirection = function() {
            var t, e = new i.Vector3;
            return function(r) {
                r.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : r.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (e.set(r.z, 0, -r.x).normalize(), t = Math.acos(r.y), this.quaternion.setFromAxisAngle(e, t))
            }
        }(), i.ArrowHelper.prototype.setLength = function(t, e, r) {
            void 0 === e && (e = .2 * t), void 0 === r && (r = .2 * e), this.line.scale.set(1, t - e, 1), this.line.updateMatrix(), this.cone.scale.set(r, e, r), this.cone.position.y = t, this.cone.updateMatrix()
        }, i.ArrowHelper.prototype.setColor = function(t) {
            this.line.material.color.set(t), this.cone.material.color.set(t)
        }, i.BoxHelper = function(t) {
            var e = new i.BufferGeometry;
            e.addAttribute("position", new i.BufferAttribute(new Float32Array(72), 3)), i.Line.call(this, e, new i.LineBasicMaterial({
                color: 16776960
            }), i.LinePieces), void 0 !== t && this.update(t)
        }, i.BoxHelper.prototype = Object.create(i.Line.prototype), i.BoxHelper.prototype.constructor = i.BoxHelper, i.BoxHelper.prototype.update = function(t) {
            var e = t.geometry;
            null === e.boundingBox && e.computeBoundingBox();
            var r = e.boundingBox.min,
                i = e.boundingBox.max,
                n = this.geometry.attributes.position.array;
            n[0] = i.x, n[1] = i.y, n[2] = i.z, n[3] = r.x, n[4] = i.y, n[5] = i.z, n[6] = r.x, n[7] = i.y, n[8] = i.z, n[9] = r.x, n[10] = r.y, n[11] = i.z, n[12] = r.x, n[13] = r.y, n[14] = i.z, n[15] = i.x, n[16] = r.y, n[17] = i.z, n[18] = i.x, n[19] = r.y, n[20] = i.z, n[21] = i.x, n[22] = i.y, n[23] = i.z, n[24] = i.x, n[25] = i.y, n[26] = r.z, n[27] = r.x, n[28] = i.y, n[29] = r.z, n[30] = r.x, n[31] = i.y, n[32] = r.z, n[33] = r.x, n[34] = r.y, n[35] = r.z, n[36] = r.x, n[37] = r.y, n[38] = r.z, n[39] = i.x, n[40] = r.y, n[41] = r.z, n[42] = i.x, n[43] = r.y, n[44] = r.z, n[45] = i.x, n[46] = i.y, n[47] = r.z, n[48] = i.x, n[49] = i.y, n[50] = i.z, n[51] = i.x, n[52] = i.y, n[53] = r.z, n[54] = r.x, n[55] = i.y, n[56] = i.z, n[57] = r.x, n[58] = i.y, n[59] = r.z, n[60] = r.x, n[61] = r.y, n[62] = i.z, n[63] = r.x, n[64] = r.y, n[65] = r.z, n[66] = i.x, n[67] = r.y, n[68] = i.z, n[69] = i.x, n[70] = r.y, n[71] = r.z, this.geometry.attributes.position.needsUpdate = !0, this.geometry.computeBoundingSphere(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1
        }, i.BoundingBoxHelper = function(t, e) {
            var r = void 0 !== e ? e : 8947848;
            this.object = t, this.box = new i.Box3, i.Mesh.call(this, new i.BoxGeometry(1, 1, 1), new i.MeshBasicMaterial({
                color: r,
                wireframe: !0
            }))
        }, i.BoundingBoxHelper.prototype = Object.create(i.Mesh.prototype), i.BoundingBoxHelper.prototype.constructor = i.BoundingBoxHelper, i.BoundingBoxHelper.prototype.update = function() {
            this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
        }, i.CameraHelper = function(t) {
            function e(t, e, i) {
                r(t, i), r(e, i)
            }

            function r(t, e) {
                n.vertices.push(new i.Vector3), n.colors.push(new i.Color(e)), void 0 === a[t] && (a[t] = []), a[t].push(n.vertices.length - 1)
            }
            var n = new i.Geometry,
                o = new i.LineBasicMaterial({
                    color: 16777215,
                    vertexColors: i.FaceColors
                }),
                a = {},
                s = 16755200,
                h = 16711680,
                l = 43775,
                c = 16777215,
                u = 3355443;
            e("n1", "n2", s), e("n2", "n4", s), e("n4", "n3", s), e("n3", "n1", s), e("f1", "f2", s), e("f2", "f4", s), e("f4", "f3", s), e("f3", "f1", s), e("n1", "f1", s), e("n2", "f2", s), e("n3", "f3", s), e("n4", "f4", s), e("p", "n1", h), e("p", "n2", h), e("p", "n3", h), e("p", "n4", h), e("u1", "u2", l), e("u2", "u3", l), e("u3", "u1", l), e("c", "t", c), e("p", "c", u), e("cn1", "cn2", u), e("cn3", "cn4", u), e("cf1", "cf2", u), e("cf3", "cf4", u), i.Line.call(this, n, o, i.LinePieces), this.camera = t, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
        }, i.CameraHelper.prototype = Object.create(i.Line.prototype), i.CameraHelper.prototype.constructor = i.CameraHelper, i.CameraHelper.prototype.update = function() {
            var t, e, r = new i.Vector3,
                n = new i.Camera,
                o = function(i, o, a, s) {
                    r.set(o, a, s).unproject(n);
                    var h = e[i];
                    if (void 0 !== h)
                        for (var l = 0, c = h.length; l < c; l++) t.vertices[h[l]].copy(r)
                };
            return function() {
                t = this.geometry, e = this.pointMap;
                var r = 1,
                    i = 1;
                n.projectionMatrix.copy(this.camera.projectionMatrix), o("c", 0, 0, -1), o("t", 0, 0, 1), o("n1", -r, -i, -1), o("n2", r, -i, -1), o("n3", -r, i, -1), o("n4", r, i, -1), o("f1", -r, -i, 1), o("f2", r, -i, 1), o("f3", -r, i, 1), o("f4", r, i, 1), o("u1", .7 * r, 1.1 * i, -1), o("u2", .7 * -r, 1.1 * i, -1), o("u3", 0, 2 * i, -1), o("cf1", -r, 0, 1), o("cf2", r, 0, 1), o("cf3", 0, -i, 1), o("cf4", 0, i, 1), o("cn1", -r, 0, -1), o("cn2", r, 0, -1), o("cn3", 0, -i, -1), o("cn4", 0, i, -1), t.verticesNeedUpdate = !0
            }
        }(), i.DirectionalLightHelper = function(t, e) {
            i.Object3D.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, e = e || 1;
            var r = new i.Geometry;
            r.vertices.push(new i.Vector3((-e), e, 0), new i.Vector3(e, e, 0), new i.Vector3(e, (-e), 0), new i.Vector3((-e), (-e), 0), new i.Vector3((-e), e, 0));
            var n = new i.LineBasicMaterial({
                fog: !1
            });
            n.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new i.Line(r, n), this.add(this.lightPlane), r = new i.Geometry, r.vertices.push(new i.Vector3, new i.Vector3), n = new i.LineBasicMaterial({
                fog: !1
            }), n.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new i.Line(r, n), this.add(this.targetLine), this.update()
        }, i.DirectionalLightHelper.prototype = Object.create(i.Object3D.prototype), i.DirectionalLightHelper.prototype.constructor = i.DirectionalLightHelper, i.DirectionalLightHelper.prototype.dispose = function() {
            this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
        }, i.DirectionalLightHelper.prototype.update = function() {
            var t = new i.Vector3,
                e = new i.Vector3,
                r = new i.Vector3;
            return function() {
                t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), r.subVectors(e, t), this.lightPlane.lookAt(r), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(r), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
            }
        }(), i.EdgesHelper = function(t, e, r) {
            var n = void 0 !== e ? e : 16777215;
            r = void 0 !== r ? r : 1;
            var o, a = Math.cos(i.Math.degToRad(r)),
                s = [0, 0],
                h = {},
                l = function(t, e) {
                    return t - e
                },
                c = ["a", "b", "c"],
                u = new i.BufferGeometry;
            t.geometry instanceof i.BufferGeometry ? (o = new i.Geometry, o.fromBufferGeometry(t.geometry)) : o = t.geometry.clone(), o.mergeVertices(), o.computeFaceNormals();
            for (var f = o.vertices, p = o.faces, d = 0, m = 0, g = p.length; m < g; m++)
                for (var v = p[m], y = 0; y < 3; y++) {
                    s[0] = v[c[y]], s[1] = v[c[(y + 1) % 3]], s.sort(l);
                    var x = s.toString();
                    void 0 === h[x] ? (h[x] = {
                        vert1: s[0],
                        vert2: s[1],
                        face1: m,
                        face2: void 0
                    }, d++) : h[x].face2 = m
                }
            var b = new Float32Array(2 * d * 3),
                _ = 0;
            for (var x in h) {
                var w = h[x];
                if (void 0 === w.face2 || p[w.face1].normal.dot(p[w.face2].normal) <= a) {
                    var M = f[w.vert1];
                    b[_++] = M.x, b[_++] = M.y, b[_++] = M.z, M = f[w.vert2], b[_++] = M.x, b[_++] = M.y, b[_++] = M.z
                }
            }
            u.addAttribute("position", new i.BufferAttribute(b, 3)), i.Line.call(this, u, new i.LineBasicMaterial({
                color: n
            }), i.LinePieces), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1
        }, i.EdgesHelper.prototype = Object.create(i.Line.prototype), i.EdgesHelper.prototype.constructor = i.EdgesHelper, i.FaceNormalsHelper = function(t, e, r, n) {
            this.object = t, this.size = void 0 !== e ? e : 1;
            for (var o = void 0 !== r ? r : 16776960, a = void 0 !== n ? n : 1, s = new i.Geometry, h = this.object.geometry.faces, l = 0, c = h.length; l < c; l++) s.vertices.push(new i.Vector3, new i.Vector3);
            i.Line.call(this, s, new i.LineBasicMaterial({
                color: o,
                linewidth: a
            }), i.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new i.Matrix3, this.update()
        }, i.FaceNormalsHelper.prototype = Object.create(i.Line.prototype), i.FaceNormalsHelper.prototype.constructor = i.FaceNormalsHelper, i.FaceNormalsHelper.prototype.update = function() {
            var t = this.geometry.vertices,
                e = this.object,
                r = e.geometry.vertices,
                i = e.geometry.faces,
                n = e.matrixWorld;
            e.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
            for (var o = 0, a = 0, s = i.length; o < s; o++, a += 2) {
                var h = i[o];
                t[a].copy(r[h.a]).add(r[h.b]).add(r[h.c]).divideScalar(3).applyMatrix4(n), t[a + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(t[a])
            }
            return this.geometry.verticesNeedUpdate = !0, this
        }, i.GridHelper = function(t, e) {
            var r = new i.Geometry,
                n = new i.LineBasicMaterial({
                    vertexColors: i.VertexColors
                });
            this.color1 = new i.Color(4473924), this.color2 = new i.Color(8947848);
            for (var o = -t; o <= t; o += e) {
                r.vertices.push(new i.Vector3((-t), 0, o), new i.Vector3(t, 0, o), new i.Vector3(o, 0, (-t)), new i.Vector3(o, 0, t));
                var a = 0 === o ? this.color1 : this.color2;
                r.colors.push(a, a, a, a)
            }
            i.Line.call(this, r, n, i.LinePieces)
        }, i.GridHelper.prototype = Object.create(i.Line.prototype), i.GridHelper.prototype.constructor = i.GridHelper, i.GridHelper.prototype.setColors = function(t, e) {
            this.color1.set(t), this.color2.set(e), this.geometry.colorsNeedUpdate = !0
        }, i.HemisphereLightHelper = function(t, e) {
            i.Object3D.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new i.Color, new i.Color];
            var r = new i.SphereGeometry(e, 4, 2);
            r.applyMatrix((new i.Matrix4).makeRotationX(-Math.PI / 2));
            for (var n = 0, o = 8; n < o; n++) r.faces[n].color = this.colors[n < 4 ? 0 : 1];
            var a = new i.MeshBasicMaterial({
                vertexColors: i.FaceColors,
                wireframe: !0
            });
            this.lightSphere = new i.Mesh(r, a), this.add(this.lightSphere), this.update()
        }, i.HemisphereLightHelper.prototype = Object.create(i.Object3D.prototype), i.HemisphereLightHelper.prototype.constructor = i.HemisphereLightHelper, i.HemisphereLightHelper.prototype.dispose = function() {
            this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
        }, i.HemisphereLightHelper.prototype.update = function() {
            var t = new i.Vector3;
            return function() {
                this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
            }
        }(), i.PointLightHelper = function(t, e) {
            this.light = t, this.light.updateMatrixWorld();
            var r = new i.SphereGeometry(e, 4, 2),
                n = new i.MeshBasicMaterial({
                    wireframe: !0,
                    fog: !1
                });
            n.color.copy(this.light.color).multiplyScalar(this.light.intensity), i.Mesh.call(this, r, n), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
        }, i.PointLightHelper.prototype = Object.create(i.Mesh.prototype), i.PointLightHelper.prototype.constructor = i.PointLightHelper, i.PointLightHelper.prototype.dispose = function() {
            this.geometry.dispose(), this.material.dispose()
        }, i.PointLightHelper.prototype.update = function() {
            this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
        }, i.SkeletonHelper = function(t) {
            this.bones = this.getBoneList(t);
            for (var e = new i.Geometry, r = 0; r < this.bones.length; r++) {
                var n = this.bones[r];
                n.parent instanceof i.Bone && (e.vertices.push(new i.Vector3), e.vertices.push(new i.Vector3), e.colors.push(new i.Color(0, 0, 1)), e.colors.push(new i.Color(0, 1, 0)))
            }
            var o = new i.LineBasicMaterial({
                vertexColors: i.VertexColors,
                depthTest: !1,
                depthWrite: !1,
                transparent: !0
            });
            i.Line.call(this, e, o, i.LinePieces), this.root = t, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.update()
        }, i.SkeletonHelper.prototype = Object.create(i.Line.prototype), i.SkeletonHelper.prototype.constructor = i.SkeletonHelper, i.SkeletonHelper.prototype.getBoneList = function(t) {
            var e = [];
            t instanceof i.Bone && e.push(t);
            for (var r = 0; r < t.children.length; r++) e.push.apply(e, this.getBoneList(t.children[r]));
            return e
        }, i.SkeletonHelper.prototype.update = function() {
            for (var t = this.geometry, e = (new i.Matrix4).getInverse(this.root.matrixWorld), r = new i.Matrix4, n = 0, o = 0; o < this.bones.length; o++) {
                var a = this.bones[o];
                a.parent instanceof i.Bone && (r.multiplyMatrices(e, a.matrixWorld), t.vertices[n].setFromMatrixPosition(r), r.multiplyMatrices(e, a.parent.matrixWorld), t.vertices[n + 1].setFromMatrixPosition(r), n += 2)
            }
            t.verticesNeedUpdate = !0, t.computeBoundingSphere()
        }, i.SpotLightHelper = function(t) {
            i.Object3D.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
            var e = new i.CylinderGeometry(0, 1, 1, 8, 1, (!0));
            e.applyMatrix((new i.Matrix4).makeTranslation(0, -.5, 0)), e.applyMatrix((new i.Matrix4).makeRotationX(-Math.PI / 2));
            var r = new i.MeshBasicMaterial({
                wireframe: !0,
                fog: !1
            });
            this.cone = new i.Mesh(e, r), this.add(this.cone), this.update()
        }, i.SpotLightHelper.prototype = Object.create(i.Object3D.prototype), i.SpotLightHelper.prototype.constructor = i.SpotLightHelper, i.SpotLightHelper.prototype.dispose = function() {
            this.cone.geometry.dispose(), this.cone.material.dispose()
        }, i.SpotLightHelper.prototype.update = function() {
            var t = new i.Vector3,
                e = new i.Vector3;
            return function() {
                var r = this.light.distance ? this.light.distance : 1e4,
                    i = r * Math.tan(this.light.angle);
                this.cone.scale.set(i, i, r), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(e.sub(t)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
            }
        }(), i.VertexNormalsHelper = function(t, e, r, n) {
            this.object = t, this.size = void 0 !== e ? e : 1;
            for (var o = void 0 !== r ? r : 16711680, a = void 0 !== n ? n : 1, s = new i.Geometry, h = t.geometry.faces, l = 0, c = h.length; l < c; l++)
                for (var u = h[l], f = 0, p = u.vertexNormals.length; f < p; f++) s.vertices.push(new i.Vector3, new i.Vector3);
            i.Line.call(this, s, new i.LineBasicMaterial({
                color: o,
                linewidth: a
            }), i.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new i.Matrix3, this.update()
        }, i.VertexNormalsHelper.prototype = Object.create(i.Line.prototype), i.VertexNormalsHelper.prototype.constructor = i.VertexNormalsHelper, i.VertexNormalsHelper.prototype.update = function(t) {
            var e = new i.Vector3;
            return function(t) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; h < l; h++)
                    for (var c = o[h], u = 0, f = c.vertexNormals.length; u < f; u++) {
                        var p = c[r[u]],
                            d = n[p],
                            m = c.vertexNormals[u];
                        i[s].copy(d).applyMatrix4(a), e.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), e.add(i[s]), s += 1, i[s].copy(e), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), i.VertexTangentsHelper = function(t, e, r, n) {
            this.object = t, this.size = void 0 !== e ? e : 1;
            for (var o = void 0 !== r ? r : 255, a = void 0 !== n ? n : 1, s = new i.Geometry, h = t.geometry.faces, l = 0, c = h.length; l < c; l++)
                for (var u = h[l], f = 0, p = u.vertexTangents.length; f < p; f++) s.vertices.push(new i.Vector3), s.vertices.push(new i.Vector3);
            i.Line.call(this, s, new i.LineBasicMaterial({
                color: o,
                linewidth: a
            }), i.LinePieces), this.matrixAutoUpdate = !1, this.update()
        }, i.VertexTangentsHelper.prototype = Object.create(i.Line.prototype), i.VertexTangentsHelper.prototype.constructor = i.VertexTangentsHelper, i.VertexTangentsHelper.prototype.update = function(t) {
            var e = new i.Vector3;
            return function(t) {
                var r = ["a", "b", "c", "d"];
                this.object.updateMatrixWorld(!0);
                for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, l = o.length; h < l; h++)
                    for (var c = o[h], u = 0, f = c.vertexTangents.length; u < f; u++) {
                        var p = c[r[u]],
                            d = n[p],
                            m = c.vertexTangents[u];
                        i[s].copy(d).applyMatrix4(a), e.copy(m).transformDirection(a).multiplyScalar(this.size), e.add(i[s]), s += 1, i[s].copy(e), s += 1
                    }
                return this.geometry.verticesNeedUpdate = !0, this
            }
        }(), i.WireframeHelper = function(t, e) {
            var r = void 0 !== e ? e : 16777215,
                n = [0, 0],
                o = {},
                a = function(t, e) {
                    return t - e
                },
                s = ["a", "b", "c"],
                h = new i.BufferGeometry;
            if (t.geometry instanceof i.Geometry) {
                for (var l = t.geometry.vertices, c = t.geometry.faces, u = 0, f = new Uint32Array(6 * c.length), p = 0, d = c.length; p < d; p++)
                    for (var m = c[p], g = 0; g < 3; g++) {
                        n[0] = m[s[g]], n[1] = m[s[(g + 1) % 3]], n.sort(a);
                        var v = n.toString();
                        void 0 === o[v] && (f[2 * u] = n[0], f[2 * u + 1] = n[1], o[v] = !0, u++)
                    }
                for (var y = new Float32Array(2 * u * 3), p = 0, d = u; p < d; p++)
                    for (var g = 0; g < 2; g++) {
                        var x = l[f[2 * p + g]],
                            b = 6 * p + 3 * g;
                        y[b + 0] = x.x, y[b + 1] = x.y, y[b + 2] = x.z
                    }
                h.addAttribute("position", new i.BufferAttribute(y, 3))
            } else if (t.geometry instanceof i.BufferGeometry)
                if (void 0 !== t.geometry.attributes.index) {
                    var l = t.geometry.attributes.position.array,
                        _ = t.geometry.attributes.index.array,
                        w = t.geometry.drawcalls,
                        u = 0;
                    0 === w.length && (w = [{
                        count: _.length,
                        index: 0,
                        start: 0
                    }]);
                    for (var f = new Uint32Array(2 * _.length), M = 0, S = w.length; M < S; ++M)
                        for (var T = w[M].start, E = w[M].count, b = w[M].index, p = T, C = T + E; p < C; p += 3)
                            for (var g = 0; g < 3; g++) {
                                n[0] = b + _[p + g], n[1] = b + _[p + (g + 1) % 3], n.sort(a);
                                var v = n.toString();
                                void 0 === o[v] && (f[2 * u] = n[0], f[2 * u + 1] = n[1], o[v] = !0, u++)
                            }
                    for (var y = new Float32Array(2 * u * 3), p = 0, d = u; p < d; p++)
                        for (var g = 0; g < 2; g++) {
                            var b = 6 * p + 3 * g,
                                A = 3 * f[2 * p + g];
                            y[b + 0] = l[A], y[b + 1] = l[A + 1], y[b + 2] = l[A + 2]
                        }
                    h.addAttribute("position", new i.BufferAttribute(y, 3))
                } else {
                    for (var l = t.geometry.attributes.position.array, u = l.length / 3, L = u / 3, y = new Float32Array(2 * u * 3), p = 0, d = L; p < d; p++)
                        for (var g = 0; g < 3; g++) {
                            var b = 18 * p + 6 * g,
                                P = 9 * p + 3 * g;
                            y[b + 0] = l[P], y[b + 1] = l[P + 1], y[b + 2] = l[P + 2];
                            var A = 9 * p + 3 * ((g + 1) % 3);
                            y[b + 3] = l[A], y[b + 4] = l[A + 1], y[b + 5] = l[A + 2]
                        }
                    h.addAttribute("position", new i.BufferAttribute(y, 3))
                }
            i.Line.call(this, h, new i.LineBasicMaterial({
                color: r
            }), i.LinePieces), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1
        }, i.WireframeHelper.prototype = Object.create(i.Line.prototype), i.WireframeHelper.prototype.constructor = i.WireframeHelper, i.ImmediateRenderObject = function() {
            i.Object3D.call(this), this.render = function(t) {}
        }, i.ImmediateRenderObject.prototype = Object.create(i.Object3D.prototype), i.ImmediateRenderObject.prototype.constructor = i.ImmediateRenderObject, i.MorphBlendMesh = function(t, e) {
            i.Mesh.call(this, t, e), this.animationsMap = {}, this.animationsList = [];
            var r = this.geometry.morphTargets.length,
                n = "__default",
                o = 0,
                a = r - 1,
                s = r / 1;
            this.createAnimation(n, o, a, s), this.setAnimationWeight(n, 1)
        }, i.MorphBlendMesh.prototype = Object.create(i.Mesh.prototype), i.MorphBlendMesh.prototype.constructor = i.MorphBlendMesh, i.MorphBlendMesh.prototype.createAnimation = function(t, e, r, i) {
            var n = {
                startFrame: e,
                endFrame: r,
                length: r - e + 1,
                fps: i,
                duration: (r - e) / i,
                lastFrame: 0,
                currentFrame: 0,
                active: !1,
                time: 0,
                direction: 1,
                weight: 1,
                directionBackwards: !1,
                mirroredLoop: !1
            };
            this.animationsMap[t] = n, this.animationsList.push(n)
        }, i.MorphBlendMesh.prototype.autoCreateAnimations = function(t) {
            for (var e, r = /([a-z]+)_?(\d+)/, i = {}, n = this.geometry, o = 0, a = n.morphTargets.length; o < a; o++) {
                var s = n.morphTargets[o],
                    h = s.name.match(r);
                if (h && h.length > 1) {
                    var l = h[1];
                    i[l] || (i[l] = {
                        start: 1 / 0,
                        end: -(1 / 0)
                    });
                    var c = i[l];
                    o < c.start && (c.start = o), o > c.end && (c.end = o), e || (e = l)
                }
            }
            for (var l in i) {
                var c = i[l];
                this.createAnimation(l, c.start, c.end, t)
            }
            this.firstAnimation = e
        }, i.MorphBlendMesh.prototype.setAnimationDirectionForward = function(t) {
            var e = this.animationsMap[t];
            e && (e.direction = 1, e.directionBackwards = !1)
        }, i.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(t) {
            var e = this.animationsMap[t];
            e && (e.direction = -1, e.directionBackwards = !0)
        }, i.MorphBlendMesh.prototype.setAnimationFPS = function(t, e) {
            var r = this.animationsMap[t];
            r && (r.fps = e, r.duration = (r.end - r.start) / r.fps)
        }, i.MorphBlendMesh.prototype.setAnimationDuration = function(t, e) {
            var r = this.animationsMap[t];
            r && (r.duration = e, r.fps = (r.end - r.start) / r.duration)
        }, i.MorphBlendMesh.prototype.setAnimationWeight = function(t, e) {
            var r = this.animationsMap[t];
            r && (r.weight = e)
        }, i.MorphBlendMesh.prototype.setAnimationTime = function(t, e) {
            var r = this.animationsMap[t];
            r && (r.time = e)
        }, i.MorphBlendMesh.prototype.getAnimationTime = function(t) {
            var e = 0,
                r = this.animationsMap[t];
            return r && (e = r.time), e
        }, i.MorphBlendMesh.prototype.getAnimationDuration = function(t) {
            var e = -1,
                r = this.animationsMap[t];
            return r && (e = r.duration), e
        }, i.MorphBlendMesh.prototype.playAnimation = function(t) {
            var e = this.animationsMap[t];
            e ? (e.time = 0, e.active = !0) : i.warn("THREE.MorphBlendMesh: animation[" + t + "] undefined in .playAnimation()")
        }, i.MorphBlendMesh.prototype.stopAnimation = function(t) {
            var e = this.animationsMap[t];
            e && (e.active = !1)
        }, i.MorphBlendMesh.prototype.update = function(t) {
            for (var e = 0, r = this.animationsList.length; e < r; e++) {
                var n = this.animationsList[e];
                if (n.active) {
                    var o = n.duration / n.length;
                    n.time += n.direction * t, n.mirroredLoop ? (n.time > n.duration || n.time < 0) && (n.direction *= -1, n.time > n.duration && (n.time = n.duration, n.directionBackwards = !0), n.time < 0 && (n.time = 0, n.directionBackwards = !1)) : (n.time = n.time % n.duration, n.time < 0 && (n.time += n.duration));
                    var a = n.startFrame + i.Math.clamp(Math.floor(n.time / o), 0, n.length - 1),
                        s = n.weight;
                    a !== n.currentFrame && (this.morphTargetInfluences[n.lastFrame] = 0, this.morphTargetInfluences[n.currentFrame] = 1 * s, this.morphTargetInfluences[a] = 0, n.lastFrame = n.currentFrame, n.currentFrame = a);
                    var h = n.time % o / o;
                    n.directionBackwards && (h = 1 - h), this.morphTargetInfluences[n.currentFrame] = h * s, this.morphTargetInfluences[n.lastFrame] = (1 - h) * s
                }
            }
        }
    }, {}],
    11: [function(t, e, r) {
        "use strict";
        var i = window.Easing = e.exports = function() {};
        i.linear = "cubic-bezier(0.250, 0.250, 0.750, 0.750)", i.inQuad = "cubic-bezier(0.550, 0.085, 0.680, 0.530)", i.inCubic = "cubic-bezier(0.550, 0.055, 0.675, 0.190)", i.inQuart = "cubic-bezier(0.895, 0.030, 0.685, 0.220)", i.inQuint = "cubic-bezier(0.755, 0.050, 0.855, 0.060)", i.inSint = "cubic-bezier(0.470, 0.000, 0.745, 0.715)", i.inExpo = "cubic-bezier(0.950, 0.050, 0.795, 0.035)", i.inCirc = "cubic-bezier(0.600, 0.040, 0.980, 0.335)", i.inBack = "cubic-bezier(0.600, -0.280, 0.735, 0.045)", i.outQuad = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", i.outCubic = "cubic-bezier(0.215, 0.610, 0.355, 1.000)", i.outQuart = "cubic-bezier(0.165, 0.840, 0.440, 1.000)", i.outQuint = "cubic-bezier(0.230, 1.000, 0.320, 1.000)", i.outSine = "cubic-bezier(0.390, 0.575, 0.565, 1.000)", i.outExpo = "cubic-bezier(0.190, 1.000, 0.220, 1.000)", i.outCirc = "cubic-bezier(0.075, 0.820, 0.165, 1.000)", i.outBack = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", i.inOutQuad = "cubic-bezier(0.455, 0.030, 0.515, 0.955)", i.inOutCubic = "cubic-bezier(0.645, 0.045, 0.355, 1.000)", i.inOutQuart = "cubic-bezier(0.770, 0.000, 0.175, 1.000)", i.inOutQuint = "cubic-bezier(0.860, 0.000, 0.070, 1.000)", i.inOutSine = "cubic-bezier(0.445, 0.050, 0.550, 0.950)", i.inOutExpo = "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
            i.inOutCirc = "cubic-bezier(0.785, 0.135, 0.150, 0.860)", i.inOutBack = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", i.bounceOut = "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
    }, {}],
    12: [function(t, e, r) {
        var i = e.exports = function() {
            function t(t) {
                return null == t ? String(t) : X[q.call(t)] || "object"
            }

            function e(e) {
                return "function" == t(e)
            }

            function r(t) {
                return null != t && t == t.window
            }

            function i(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }

            function n(e) {
                return "object" == t(e)
            }

            function o(t) {
                return n(t) && !r(t) && Object.getPrototypeOf(t) == Object.prototype
            }

            function a(t) {
                return "number" == typeof t.length
            }

            function s(t) {
                return L.call(t, function(t) {
                    return null != t
                })
            }

            function h(t) {
                return t.length > 0 ? M.fn.concat.apply([], t) : t
            }

            function l(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }

            function c(t) {
                return t in F ? F[t] : F[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
            }

            function u(t, e) {
                return "number" != typeof e || D[l(t)] ? e : e + "px"
            }

            function f(t) {
                var e, r;
                return R[t] || (e = P.createElement(t), P.body.appendChild(e), r = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == r && (r = "block"), R[t] = r), R[t]
            }

            function p(t) {
                return "children" in t ? A.call(t.children) : M.map(t.childNodes, function(t) {
                    if (1 == t.nodeType) return t
                })
            }

            function d(t, e, r) {
                for (w in e) r && (o(e[w]) || Z(e[w])) ? (o(e[w]) && !o(t[w]) && (t[w] = {}), Z(e[w]) && !Z(t[w]) && (t[w] = []), d(t[w], e[w], r)) : e[w] !== _ && (t[w] = e[w])
            }

            function m(t, e) {
                return null == e ? M(t) : M(t).filter(e)
            }

            function g(t, r, i, n) {
                return e(r) ? r.call(t, i, n) : r
            }

            function v(t, e, r) {
                null == r ? t.removeAttribute(e) : t.setAttribute(e, r)
            }

            function y(t, e) {
                var r = t.className || "",
                    i = r && r.baseVal !== _;
                return e === _ ? i ? r.baseVal : r : void(i ? r.baseVal = e : t.className = e)
            }

            function x(t) {
                try {
                    return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? M.parseJSON(t) : t) : t
                } catch (e) {
                    return t
                }
            }

            function b(t, e) {
                e(t);
                for (var r = 0, i = t.childNodes.length; r < i; r++) b(t.childNodes[r], e)
            }
            var _, w, M, S, T, E, C = [],
                A = C.slice,
                L = C.filter,
                P = window.document,
                R = {},
                F = {},
                D = {
                    "column-count": 1,
                    columns: 1,
                    "font-weight": 1,
                    "line-height": 1,
                    opacity: 1,
                    "z-index": 1,
                    zoom: 1
                },
                B = /^\s*<(\w+|!)[^>]*>/,
                U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                V = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                O = /^(?:body|html)$/i,
                z = /([A-Z])/g,
                k = ["val", "css", "html", "text", "data", "width", "height", "offset"],
                N = ["after", "prepend", "before", "append"],
                I = P.createElement("table"),
                G = P.createElement("tr"),
                H = {
                    tr: P.createElement("tbody"),
                    tbody: I,
                    thead: I,
                    tfoot: I,
                    td: G,
                    th: G,
                    "*": P.createElement("div")
                },
                W = /complete|loaded|interactive/,
                j = /^[\w-]*$/,
                X = {},
                q = X.toString,
                Y = {},
                K = P.createElement("div"),
                Q = {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    for: "htmlFor",
                    class: "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                Z = Array.isArray || function(t) {
                    return t instanceof Array
                };
            return Y.matches = function(t, e) {
                if (!e || !t || 1 !== t.nodeType) return !1;
                var r = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                if (r) return r.call(t, e);
                var i, n = t.parentNode,
                    o = !n;
                return o && (n = K).appendChild(t), i = ~Y.qsa(n, e).indexOf(t), o && K.removeChild(t), i
            }, T = function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }, E = function(t) {
                return L.call(t, function(e, r) {
                    return t.indexOf(e) == r
                })
            }, Y.fragment = function(t, e, r) {
                var i, n, a;
                return U.test(t) && (i = M(P.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(V, "<$1></$2>")), e === _ && (e = B.test(t) && RegExp.$1), e in H || (e = "*"), a = H[e], a.innerHTML = "" + t, i = M.each(A.call(a.childNodes), function() {
                    a.removeChild(this)
                })), o(r) && (n = M(i), M.each(r, function(t, e) {
                    k.indexOf(t) > -1 ? n[t](e) : n.attr(t, e)
                })), i
            }, Y.Z = function(t, e) {
                return t = t || [], t.__proto__ = M.fn, t.selector = e || "", t
            }, Y.isZ = function(t) {
                return t instanceof Y.Z
            }, Y.init = function(t, r) {
                var i;
                if (!t) return Y.Z();
                if ("string" == typeof t)
                    if (t = t.trim(), "<" == t[0] && B.test(t)) i = Y.fragment(t, RegExp.$1, r), t = null;
                    else {
                        if (r !== _) return M(r).find(t);
                        i = Y.qsa(P, t)
                    }
                else {
                    if (e(t)) return M(P).ready(t);
                    if (Y.isZ(t)) return t;
                    if (Z(t)) i = s(t);
                    else if (n(t)) i = [t], t = null;
                    else if (B.test(t)) i = Y.fragment(t.trim(), RegExp.$1, r), t = null;
                    else {
                        if (r !== _) return M(r).find(t);
                        i = Y.qsa(P, t)
                    }
                }
                return Y.Z(i, t)
            }, M = function(t, e) {
                return Y.init(t, e)
            }, M.extend = function(t) {
                var e, r = A.call(arguments, 1);
                return "boolean" == typeof t && (e = t, t = r.shift()), r.forEach(function(r) {
                    d(t, r, e)
                }), t
            }, Y.qsa = function(t, e) {
                var r, n = "#" == e[0],
                    o = !n && "." == e[0],
                    a = n || o ? e.slice(1) : e,
                    s = j.test(a);
                return i(t) && s && n ? (r = t.getElementById(a)) ? [r] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : A.call(s && !n ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
            }, M.contains = P.documentElement.contains ? function(t, e) {
                return t !== e && t.contains(e)
            } : function(t, e) {
                for (; e && (e = e.parentNode);)
                    if (e === t) return !0;
                return !1
            }, M.type = t, M.isFunction = e, M.isWindow = r, M.isArray = Z, M.isPlainObject = o, M.isEmptyObject = function(t) {
                var e;
                for (e in t) return !1;
                return !0
            }, M.inArray = function(t, e, r) {
                return C.indexOf.call(e, t, r)
            }, M.camelCase = T, M.trim = function(t) {
                return null == t ? "" : String.prototype.trim.call(t)
            }, M.uuid = 0, M.support = {}, M.expr = {}, M.map = function(t, e) {
                var r, i, n, o = [];
                if (a(t))
                    for (i = 0; i < t.length; i++) r = e(t[i], i), null != r && o.push(r);
                else
                    for (n in t) r = e(t[n], n), null != r && o.push(r);
                return h(o)
            }, M.each = function(t, e) {
                var r, i;
                if (a(t)) {
                    for (r = 0; r < t.length; r++)
                        if (e.call(t[r], r, t[r]) === !1) return t
                } else
                    for (i in t)
                        if (e.call(t[i], i, t[i]) === !1) return t;
                return t
            }, M.grep = function(t, e) {
                return L.call(t, e)
            }, window.JSON && (M.parseJSON = JSON.parse), M.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                X["[object " + e + "]"] = e.toLowerCase()
            }), M.fn = {
                forEach: C.forEach,
                reduce: C.reduce,
                push: C.push,
                sort: C.sort,
                indexOf: C.indexOf,
                concat: C.concat,
                map: function(t) {
                    return M(M.map(this, function(e, r) {
                        return t.call(e, r, e)
                    }))
                },
                slice: function() {
                    return M(A.apply(this, arguments))
                },
                ready: function(t) {
                    return W.test(P.readyState) && P.body ? t(M) : P.addEventListener("DOMContentLoaded", function() {
                        t(M)
                    }, !1), this
                },
                get: function(t) {
                    return t === _ ? A.call(this) : this[t >= 0 ? t : t + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(t) {
                    return C.every.call(this, function(e, r) {
                        return t.call(e, r, e) !== !1
                    }), this
                },
                filter: function(t) {
                    return e(t) ? this.not(this.not(t)) : M(L.call(this, function(e) {
                        return Y.matches(e, t)
                    }))
                },
                add: function(t, e) {
                    return M(E(this.concat(M(t, e))))
                },
                is: function(t) {
                    return this.length > 0 && Y.matches(this[0], t)
                },
                not: function(t) {
                    var r = [];
                    if (e(t) && t.call !== _) this.each(function(e) {
                        t.call(this, e) || r.push(this)
                    });
                    else {
                        var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? A.call(t) : M(t);
                        this.forEach(function(t) {
                            i.indexOf(t) < 0 && r.push(t)
                        })
                    }
                    return M(r)
                },
                has: function(t) {
                    return this.filter(function() {
                        return n(t) ? M.contains(this, t) : M(this).find(t).size()
                    })
                },
                eq: function(t) {
                    return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
                },
                first: function() {
                    var t = this[0];
                    return t && !n(t) ? t : M(t)
                },
                last: function() {
                    var t = this[this.length - 1];
                    return t && !n(t) ? t : M(t)
                },
                find: function(t) {
                    var e, r = this;
                    return e = t ? "object" == typeof t ? M(t).filter(function() {
                        var t = this;
                        return C.some.call(r, function(e) {
                            return M.contains(e, t)
                        })
                    }) : 1 == this.length ? M(Y.qsa(this[0], t)) : this.map(function() {
                        return Y.qsa(this, t)
                    }) : M()
                },
                closest: function(t, e) {
                    var r = this[0],
                        n = !1;
                    for ("object" == typeof t && (n = M(t)); r && !(n ? n.indexOf(r) >= 0 : Y.matches(r, t));) r = r !== e && !i(r) && r.parentNode;
                    return M(r)
                },
                parents: function(t) {
                    for (var e = [], r = this; r.length > 0;) r = M.map(r, function(t) {
                        if ((t = t.parentNode) && !i(t) && e.indexOf(t) < 0) return e.push(t), t
                    });
                    return m(e, t)
                },
                parent: function(t) {
                    return m(E(this.pluck("parentNode")), t)
                },
                children: function(t) {
                    return m(this.map(function() {
                        return p(this)
                    }), t)
                },
                contents: function() {
                    return this.map(function() {
                        return A.call(this.childNodes)
                    })
                },
                siblings: function(t) {
                    return m(this.map(function(t, e) {
                        return L.call(p(e.parentNode), function(t) {
                            return t !== e
                        })
                    }), t)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(t) {
                    return M.map(this, function(e) {
                        return e[t]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = f(this.nodeName))
                    })
                },
                replaceWith: function(t) {
                    return this.before(t).remove()
                },
                wrap: function(t) {
                    var r = e(t);
                    if (this[0] && !r) var i = M(t).get(0),
                        n = i.parentNode || this.length > 1;
                    return this.each(function(e) {
                        M(this).wrapAll(r ? t.call(this, e) : n ? i.cloneNode(!0) : i)
                    })
                },
                wrapAll: function(t) {
                    if (this[0]) {
                        M(this[0]).before(t = M(t));
                        for (var e;
                            (e = t.children()).length;) t = e.first();
                        M(t).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    var r = e(t);
                    return this.each(function(e) {
                        var i = M(this),
                            n = i.contents(),
                            o = r ? t.call(this, e) : t;
                        n.length ? n.wrapAll(o) : i.append(o)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        M(this).replaceWith(M(this).children())
                    }), this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(t) {
                    return this.each(function() {
                        var e = M(this);
                        (t === _ ? "none" == e.css("display") : t) ? e.show(): e.hide()
                    })
                },
                prev: function(t) {
                    return M(this.pluck("previousElementSibling")).filter(t || "*")
                },
                next: function(t) {
                    return M(this.pluck("nextElementSibling")).filter(t || "*")
                },
                html: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var r = this.innerHTML;
                        M(this).empty().append(g(this, t, e, r))
                    }) : 0 in this ? this[0].innerHTML : null
                },
                text: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var r = g(this, t, e, this.textContent);
                        this.textContent = null == r ? "" : "" + r
                    }) : 0 in this ? this[0].textContent : null
                },
                attr: function(t, e) {
                    var r;
                    return "string" != typeof t || 1 in arguments ? this.each(function(r) {
                        if (1 === this.nodeType)
                            if (n(t))
                                for (w in t) v(this, w, t[w]);
                            else v(this, t, g(this, e, r, this.getAttribute(t)))
                    }) : this.length && 1 === this[0].nodeType ? !(r = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : r : _
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        1 === this.nodeType && t.split(" ").forEach(function(t) {
                            v(this, t)
                        }, this)
                    })
                },
                prop: function(t, e) {
                    return t = Q[t] || t, 1 in arguments ? this.each(function(r) {
                        this[t] = g(this, e, r, this[t])
                    }) : this[0] && this[0][t]
                },
                data: function(t, e) {
                    var r = "data-" + t.replace(z, "-$1").toLowerCase(),
                        i = 1 in arguments ? this.attr(r, e) : this.attr(r);
                    return null !== i ? x(i) : _
                },
                val: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        this.value = g(this, t, e, this.value)
                    }) : this[0] && (this[0].multiple ? M(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                },
                offset: function(t) {
                    if (t) return this.each(function(e) {
                        var r = M(this),
                            i = g(this, t, e, r.offset()),
                            n = r.offsetParent().offset(),
                            o = {
                                top: i.top - n.top,
                                left: i.left - n.left
                            };
                        "static" == r.css("position") && (o.position = "relative"), r.css(o)
                    });
                    if (!this.length) return null;
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + window.pageXOffset,
                        top: e.top + window.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(e, r) {
                    if (arguments.length < 2) {
                        var i, n = this[0];
                        if (!n) return;
                        if (i = getComputedStyle(n, ""), "string" == typeof e) return n.style[T(e)] || i.getPropertyValue(e);
                        if (Z(e)) {
                            var o = {};
                            return M.each(e, function(t, e) {
                                o[e] = n.style[T(e)] || i.getPropertyValue(e)
                            }), o
                        }
                    }
                    var a = "";
                    if ("string" == t(e)) r || 0 === r ? a = l(e) + ":" + u(e, r) : this.each(function() {
                        this.style.removeProperty(l(e))
                    });
                    else
                        for (w in e) e[w] || 0 === e[w] ? a += l(w) + ":" + u(w, e[w]) + ";" : this.each(function() {
                            this.style.removeProperty(l(w))
                        });
                    return this.each(function() {
                        this.style.cssText += ";" + a
                    })
                },
                index: function(t) {
                    return t ? this.indexOf(M(t)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(t) {
                    return !!t && C.some.call(this, function(t) {
                        return this.test(y(t))
                    }, c(t))
                },
                addClass: function(t) {
                    return t ? this.each(function(e) {
                        if ("className" in this) {
                            S = [];
                            var r = y(this),
                                i = g(this, t, e, r);
                            i.split(/\s+/g).forEach(function(t) {
                                M(this).hasClass(t) || S.push(t)
                            }, this), S.length && y(this, r + (r ? " " : "") + S.join(" "))
                        }
                    }) : this
                },
                removeClass: function(t) {
                    return this.each(function(e) {
                        if ("className" in this) {
                            if (t === _) return y(this, "");
                            S = y(this), g(this, t, e, S).split(/\s+/g).forEach(function(t) {
                                S = S.replace(c(t), " ")
                            }), y(this, S.trim())
                        }
                    })
                },
                toggleClass: function(t, e) {
                    return t ? this.each(function(r) {
                        var i = M(this),
                            n = g(this, t, r, y(this));
                        n.split(/\s+/g).forEach(function(t) {
                            (e === _ ? !i.hasClass(t) : e) ? i.addClass(t): i.removeClass(t)
                        })
                    }) : this
                },
                scrollTop: function(t) {
                    if (this.length) {
                        var e = "scrollTop" in this[0];
                        return t === _ ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                            this.scrollTop = t
                        } : function() {
                            this.scrollTo(this.scrollX, t)
                        })
                    }
                },
                scrollLeft: function(t) {
                    if (this.length) {
                        var e = "scrollLeft" in this[0];
                        return t === _ ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                            this.scrollLeft = t
                        } : function() {
                            this.scrollTo(t, this.scrollY)
                        })
                    }
                },
                position: function() {
                    if (this.length) {
                        var t = this[0],
                            e = this.offsetParent(),
                            r = this.offset(),
                            i = O.test(e[0].nodeName) ? {
                                top: 0,
                                left: 0
                            } : e.offset();
                        return r.top -= parseFloat(M(t).css("margin-top")) || 0, r.left -= parseFloat(M(t).css("margin-left")) || 0, i.top += parseFloat(M(e[0]).css("border-top-width")) || 0, i.left += parseFloat(M(e[0]).css("border-left-width")) || 0, {
                            top: r.top - i.top,
                            left: r.left - i.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || P.body; t && !O.test(t.nodeName) && "static" == M(t).css("position");) t = t.offsetParent;
                        return t
                    })
                }
            }, M.fn.detach = M.fn.remove, ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(t) {
                    return t[0].toUpperCase()
                });
                M.fn[t] = function(n) {
                    var o, a = this[0];
                    return n === _ ? r(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                        a = M(this), a.css(t, g(this, n, e, a[t]()))
                    })
                }
            }), N.forEach(function(e, r) {
                var i = r % 2;
                M.fn[e] = function() {
                    var e, n, o = M.map(arguments, function(r) {
                            return e = t(r), "object" == e || "array" == e || null == r ? r : Y.fragment(r)
                        }),
                        a = this.length > 1;
                    return o.length < 1 ? this : this.each(function(t, e) {
                        n = i ? e : e.parentNode, e = 0 == r ? e.nextSibling : 1 == r ? e.firstChild : 2 == r ? e : null;
                        var s = M.contains(P.documentElement, n);
                        o.forEach(function(t) {
                            if (a) t = t.cloneNode(!0);
                            else if (!n) return M(t).remove();
                            n.insertBefore(t, e), s && b(t, function(t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                        })
                    })
                }, M.fn[i ? e + "To" : "insert" + (r ? "Before" : "After")] = function(t) {
                    return M(t)[e](this), this
                }
            }), Y.Z.prototype = M.fn, Y.uniq = E, Y.deserializeValue = x, M.zepto = Y, M
        }();
        window.Zepto = i, void 0 === window.$ && (window.$ = i),
            function(t) {
                function e(t) {
                    return t._zid || (t._zid = f++)
                }

                function r(t, r, o, a) {
                    if (r = i(r), r.ns) var s = n(r.ns);
                    return (g[e(t)] || []).filter(function(t) {
                        return t && (!r.e || t.e == r.e) && (!r.ns || s.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!a || t.sel == a)
                    })
                }

                function i(t) {
                    var e = ("" + t).split(".");
                    return {
                        e: e[0],
                        ns: e.slice(1).sort().join(" ")
                    }
                }

                function n(t) {
                    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
                }

                function o(t, e) {
                    return t.del && !y && t.e in x || !!e
                }

                function a(t) {
                    return b[t] || y && x[t] || t
                }

                function s(r, n, s, h, c, f, p) {
                    var d = e(r),
                        m = g[d] || (g[d] = []);
                    n.split(/\s/).forEach(function(e) {
                        if ("ready" == e) return t(document).ready(s);
                        var n = i(e);
                        n.fn = s, n.sel = c, n.e in b && (s = function(e) {
                            var r = e.relatedTarget;
                            if (!r || r !== this && !t.contains(this, r)) return n.fn.apply(this, arguments)
                        }), n.del = f;
                        var d = f || s;
                        n.proxy = function(t) {
                            if (t = l(t), !t.isImmediatePropagationStopped()) {
                                t.data = h;
                                var e = d.apply(r, t._args == u ? [t] : [t].concat(t._args));
                                return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                            }
                        }, n.i = m.length, m.push(n), "addEventListener" in r && r.addEventListener(a(n.e), n.proxy, o(n, p))
                    })
                }

                function h(t, i, n, s, h) {
                    var l = e(t);
                    (i || "").split(/\s/).forEach(function(e) {
                        r(t, e, n, s).forEach(function(e) {
                            delete g[l][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, h))
                        })
                    })
                }

                function l(e, r) {
                    return !r && e.isDefaultPrevented || (r || (r = e), t.each(S, function(t, i) {
                        var n = r[t];
                        e[t] = function() {
                            return this[i] = _, n && n.apply(r, arguments)
                        }, e[i] = w
                    }), (r.defaultPrevented !== u ? r.defaultPrevented : "returnValue" in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault()) && (e.isDefaultPrevented = _)), e
                }

                function c(t) {
                    var e, r = {
                        originalEvent: t
                    };
                    for (e in t) M.test(e) || t[e] === u || (r[e] = t[e]);
                    return l(r, t)
                }
                var u, f = 1,
                    p = Array.prototype.slice,
                    d = t.isFunction,
                    m = function(t) {
                        return "string" == typeof t
                    },
                    g = {},
                    v = {},
                    y = "onfocusin" in window,
                    x = {
                        focus: "focusin",
                        blur: "focusout"
                    },
                    b = {
                        mouseenter: "mouseover",
                        mouseleave: "mouseout"
                    };
                v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
                    add: s,
                    remove: h
                }, t.proxy = function(r, i) {
                    var n = 2 in arguments && p.call(arguments, 2);
                    if (d(r)) {
                        var o = function() {
                            return r.apply(i, n ? n.concat(p.call(arguments)) : arguments)
                        };
                        return o._zid = e(r), o
                    }
                    if (m(i)) return n ? (n.unshift(r[i], r), t.proxy.apply(null, n)) : t.proxy(r[i], r);
                    throw new TypeError("expected function")
                }, t.fn.bind = function(t, e, r) {
                    return this.on(t, e, r)
                }, t.fn.unbind = function(t, e) {
                    return this.off(t, e)
                }, t.fn.one = function(t, e, r, i) {
                    return this.on(t, e, r, i, 1)
                };
                var _ = function() {
                        return !0
                    },
                    w = function() {
                        return !1
                    },
                    M = /^([A-Z]|returnValue$|layer[XY]$)/,
                    S = {
                        preventDefault: "isDefaultPrevented",
                        stopImmediatePropagation: "isImmediatePropagationStopped",
                        stopPropagation: "isPropagationStopped"
                    };
                t.fn.delegate = function(t, e, r) {
                    return this.on(e, t, r)
                }, t.fn.undelegate = function(t, e, r) {
                    return this.off(e, t, r)
                }, t.fn.live = function(e, r) {
                    return t(document.body).delegate(this.selector, e, r), this
                }, t.fn.die = function(e, r) {
                    return t(document.body).undelegate(this.selector, e, r), this
                }, t.fn.on = function(e, r, i, n, o) {
                    var a, l, f = this;
                    return e && !m(e) ? (t.each(e, function(t, e) {
                        f.on(t, r, i, e, o)
                    }), f) : (m(r) || d(n) || n === !1 || (n = i, i = r, r = u), (d(i) || i === !1) && (n = i, i = u), n === !1 && (n = w), f.each(function(u, f) {
                        o && (a = function(t) {
                            return h(f, t.type, n), n.apply(this, arguments)
                        }), r && (l = function(e) {
                            var i, o = t(e.target).closest(r, f).get(0);
                            if (o && o !== f) return i = t.extend(c(e), {
                                currentTarget: o,
                                liveFired: f
                            }), (a || n).apply(o, [i].concat(p.call(arguments, 1)))
                        }), s(f, e, n, i, r, l || a)
                    }))
                }, t.fn.off = function(e, r, i) {
                    var n = this;
                    return e && !m(e) ? (t.each(e, function(t, e) {
                        n.off(t, r, e)
                    }), n) : (m(r) || d(i) || i === !1 || (i = r, r = u), i === !1 && (i = w), n.each(function() {
                        h(this, e, i, r)
                    }))
                }, t.fn.trigger = function(e, r) {
                    return e = m(e) || t.isPlainObject(e) ? t.Event(e) : l(e), e._args = r, this.each(function() {
                        e.type in x && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, r)
                    })
                }, t.fn.triggerHandler = function(e, i) {
                    var n, o;
                    return this.each(function(a, s) {
                        n = c(m(e) ? t.Event(e) : e), n._args = i, n.target = s, t.each(r(s, e.type || e), function(t, e) {
                            if (o = e.proxy(n), n.isImmediatePropagationStopped()) return !1
                        })
                    }), o
                }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
                    t.fn[e] = function(t) {
                        return 0 in arguments ? this.bind(e, t) : this.trigger(e)
                    }
                }), t.Event = function(t, e) {
                    m(t) || (e = t, t = e.type);
                    var r = document.createEvent(v[t] || "Events"),
                        i = !0;
                    if (e)
                        for (var n in e) "bubbles" == n ? i = !!e[n] : r[n] = e[n];
                    return r.initEvent(t, i, !0), l(r)
                }
            }(i),
            function(t) {
                function e(e, r, i) {
                    var n = t.Event(r);
                    return t(e).trigger(n, i), !n.isDefaultPrevented()
                }

                function r(t, r, i, n) {
                    if (t.global) return e(r || y, i, n)
                }

                function i(e) {
                    e.global && 0 === t.active++ && r(e, null, "ajaxStart")
                }

                function n(e) {
                    e.global && !--t.active && r(e, null, "ajaxStop")
                }

                function o(t, e) {
                    var i = e.context;
                    return e.beforeSend.call(i, t, e) !== !1 && r(e, i, "ajaxBeforeSend", [t, e]) !== !1 && void r(e, i, "ajaxSend", [t, e])
                }

                function a(t, e, i, n) {
                    var o = i.context,
                        a = "success";
                    i.success.call(o, t, a, e), n && n.resolveWith(o, [t, a, e]), r(i, o, "ajaxSuccess", [e, i, t]), h(a, e, i)
                }

                function s(t, e, i, n, o) {
                    var a = n.context;
                    n.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), r(n, a, "ajaxError", [i, n, t || e]), h(e, i, n)
                }

                function h(t, e, i) {
                    var o = i.context;
                    i.complete.call(o, e, t), r(i, o, "ajaxComplete", [e, i]), n(i)
                }

                function l() {}

                function c(t) {
                    return t && (t = t.split(";", 2)[0]), t && (t == M ? "html" : t == w ? "json" : b.test(t) ? "script" : _.test(t) && "xml") || "text"
                }

                function u(t, e) {
                    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
                }

                function f(e) {
                    e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = u(e.url, e.data), e.data = void 0)
                }

                function p(e, r, i, n) {
                    return t.isFunction(r) && (n = i, i = r, r = void 0), t.isFunction(i) || (n = i, i = void 0), {
                        url: e,
                        data: r,
                        success: i,
                        dataType: n
                    }
                }

                function d(e, r, i, n) {
                    var o, a = t.isArray(r),
                        s = t.isPlainObject(r);
                    t.each(r, function(r, h) {
                        o = t.type(h), n && (r = i ? n : n + "[" + (s || "object" == o || "array" == o ? r : "") + "]"), !n && a ? e.add(h.name, h.value) : "array" == o || !i && "object" == o ? d(e, h, i, r) : e.add(r, h)
                    })
                }
                var m, g, v = 0,
                    y = window.document,
                    x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                    b = /^(?:text|application)\/javascript/i,
                    _ = /^(?:text|application)\/xml/i,
                    w = "application/json",
                    M = "text/html",
                    S = /^\s*$/,
                    T = y.createElement("a");
                T.href = window.location.href, t.active = 0, t.ajaxJSONP = function(e, r) {
                    if (!("type" in e)) return t.ajax(e);
                    var i, n, h = e.jsonpCallback,
                        l = (t.isFunction(h) ? h() : h) || "jsonp" + ++v,
                        c = y.createElement("script"),
                        u = window[l],
                        f = function(e) {
                            t(c).triggerHandler("error", e || "abort")
                        },
                        p = {
                            abort: f
                        };
                    return r && r.promise(p), t(c).on("load error", function(o, h) {
                        clearTimeout(n), t(c).off().remove(), "error" != o.type && i ? a(i[0], p, e, r) : s(null, h || "error", p, e, r), window[l] = u, i && t.isFunction(u) && u(i[0]), u = i = void 0
                    }), o(p, e) === !1 ? (f("abort"), p) : (window[l] = function() {
                        i = arguments
                    }, c.src = e.url.replace(/\?(.+)=\?/, "?$1=" + l), y.head.appendChild(c), e.timeout > 0 && (n = setTimeout(function() {
                        f("timeout")
                    }, e.timeout)), p)
                }, t.ajaxSettings = {
                    type: "GET",
                    beforeSend: l,
                    success: l,
                    error: l,
                    complete: l,
                    context: null,
                    global: !0,
                    xhr: function() {
                        return new window.XMLHttpRequest
                    },
                    accepts: {
                        script: "text/javascript, application/javascript, application/x-javascript",
                        json: w,
                        xml: "application/xml, text/xml",
                        html: M,
                        text: "text/plain"
                    },
                    crossDomain: !1,
                    timeout: 0,
                    processData: !0,
                    cache: !0
                }, t.ajax = function(e) {
                    var r, n = t.extend({}, e || {}),
                        h = t.Deferred && t.Deferred();
                    for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
                    i(n), n.crossDomain || (r = y.createElement("a"), r.href = n.url, r.href = r.href, n.crossDomain = T.protocol + "//" + T.host != r.protocol + "//" + r.host), n.url || (n.url = window.location.toString()), f(n);
                    var p = n.dataType,
                        d = /\?.+=\?/.test(n.url);
                    if (d && (p = "jsonp"), n.cache !== !1 && (e && e.cache === !0 || "script" != p && "jsonp" != p) || (n.url = u(n.url, "_=" + Date.now())), "jsonp" == p) return d || (n.url = u(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, h);
                    var v, x = n.accepts[p],
                        b = {},
                        _ = function(t, e) {
                            b[t.toLowerCase()] = [t, e]
                        },
                        w = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
                        M = n.xhr(),
                        E = M.setRequestHeader;
                    if (h && h.promise(M), n.crossDomain || _("X-Requested-With", "XMLHttpRequest"), _("Accept", x || "*/*"), (x = n.mimeType || x) && (x.indexOf(",") > -1 && (x = x.split(",", 2)[0]), M.overrideMimeType && M.overrideMimeType(x)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && _("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)
                        for (g in n.headers) _(g, n.headers[g]);
                    M.setRequestHeader = _, M.onreadystatechange = function() {
                        if (4 == M.readyState) {
                            M.onreadystatechange = l, clearTimeout(v);
                            var e, r = !1;
                            if (M.status >= 200 && M.status < 300 || 304 == M.status || 0 == M.status && "file:" == w) {
                                p = p || c(n.mimeType || M.getResponseHeader("content-type")), e = M.responseText;
                                try {
                                    "script" == p ? (0, eval)(e) : "xml" == p ? e = M.responseXML : "json" == p && (e = S.test(e) ? null : t.parseJSON(e))
                                } catch (t) {
                                    r = t
                                }
                                r ? s(r, "parsererror", M, n, h) : a(e, M, n, h)
                            } else s(M.statusText || null, M.status ? "error" : "abort", M, n, h)
                        }
                    };
                    var C = !("async" in n) || n.async;
                    if (M.open(n.type, n.url, C, n.username, n.password), o(M, n) === !1) return M.abort(), s(null, "abort", M, n, h), M;
                    if (n.xhrFields)
                        for (g in n.xhrFields) M[g] = n.xhrFields[g];
                    for (g in b) E.apply(M, b[g]);
                    return n.timeout > 0 && (v = setTimeout(function() {
                        M.onreadystatechange = l, M.abort(), s(null, "timeout", M, n, h)
                    }, n.timeout)), M.send(n.data ? n.data : null), M
                }, t.get = function() {
                    return t.ajax(p.apply(null, arguments))
                }, t.post = function() {
                    var e = p.apply(null, arguments);
                    return e.type = "POST", t.ajax(e)
                }, t.getJSON = function() {
                    var e = p.apply(null, arguments);
                    return e.dataType = "json", t.ajax(e)
                }, t.fn.load = function(e, r, i) {
                    if (!this.length) return this;
                    var n, o = this,
                        a = e.split(/\s/),
                        s = p(e, r, i),
                        h = s.success;
                    return a.length > 1 && (s.url = a[0], n = a[1]), s.success = function(e) {
                        o.html(n ? t("<div>").html(e.replace(x, "")).find(n) : e), h && h.apply(o, arguments)
                    }, t.ajax(s), this
                };
                var E = encodeURIComponent;
                t.param = function(e, r) {
                    var i = [];
                    return i.add = function(e, r) {
                        t.isFunction(r) && (r = r()), null == r && (r = ""), this.push(E(e) + "=" + E(r))
                    }, d(i, e, r), i.join("&").replace(/%20/g, "+")
                }
            }(i),
            function(t) {
                t.fn.serializeArray = function() {
                    var e, r, i = [],
                        n = function(t) {
                            return t.forEach ? t.forEach(n) : void i.push({
                                name: e,
                                value: t
                            })
                        };
                    return this[0] && t.each(this[0].elements, function(i, o) {
                        r = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != r && "reset" != r && "button" != r && "file" != r && ("radio" != r && "checkbox" != r || o.checked) && n(t(o).val())
                    }), i
                }, t.fn.serialize = function() {
                    var t = [];
                    return this.serializeArray().forEach(function(e) {
                        t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                    }), t.join("&")
                }, t.fn.submit = function(e) {
                    if (0 in arguments) this.bind("submit", e);
                    else if (this.length) {
                        var r = t.Event("submit");
                        this.eq(0).trigger(r), r.isDefaultPrevented() || this.get(0).submit()
                    }
                    return this
                }
            }(i),
            function(t) {
                "__proto__" in {} || t.extend(t.zepto, {
                    Z: function(e, r) {
                        return e = e || [], t.extend(e, t.fn), e.selector = r || "", e.__Z = !0, e
                    },
                    isZ: function(e) {
                        return "array" === t.type(e) && "__Z" in e
                    }
                });
                try {
                    getComputedStyle(void 0)
                } catch (t) {
                    var e = getComputedStyle;
                    window.getComputedStyle = function(t) {
                        try {
                            return e(t)
                        } catch (t) {
                            return null
                        }
                    }
                }
            }(i),
            function(t) {
                function e(t, e) {
                    var r = this.os = {},
                        i = this.browser = {},
                        n = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                        o = t.match(/(Android);?[\s\/]+([\d.]+)?/),
                        a = !!t.match(/\(Macintosh\; Intel /),
                        s = t.match(/(iPad).*OS\s([\d_]+)/),
                        h = t.match(/(iPod)(.*OS\s([\d_]+))?/),
                        l = !s && t.match(/(iPhone\sOS)\s([\d_]+)/),
                        c = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                        u = /Win\d{2}|Windows/.test(e),
                        f = t.match(/Windows Phone ([\d.]+)/),
                        p = c && t.match(/TouchPad/),
                        d = t.match(/Kindle\/([\d.]+)/),
                        m = t.match(/Silk\/([\d._]+)/),
                        g = t.match(/(BlackBerry).*Version\/([\d.]+)/),
                        v = t.match(/(BB10).*Version\/([\d.]+)/),
                        y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                        x = t.match(/PlayBook/),
                        b = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
                        _ = t.match(/Firefox\/([\d.]+)/),
                        w = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                        M = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                        S = !b && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                        T = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
                    (i.webkit = !!n) && (i.version = n[1]), o && (r.android = !0, r.version = o[2]), l && !h && (r.ios = r.iphone = !0, r.version = l[2].replace(/_/g, ".")), s && (r.ios = r.ipad = !0, r.version = s[2].replace(/_/g, ".")), h && (r.ios = r.ipod = !0, r.version = h[3] ? h[3].replace(/_/g, ".") : null), f && (r.wp = !0, r.version = f[1]), c && (r.webos = !0, r.version = c[2]), p && (r.touchpad = !0), g && (r.blackberry = !0, r.version = g[2]), v && (r.bb10 = !0, r.version = v[2]), y && (r.rimtabletos = !0, r.version = y[2]), x && (i.playbook = !0), d && (r.kindle = !0, r.version = d[1]), m && (i.silk = !0, i.version = m[1]), !m && r.android && t.match(/Kindle Fire/) && (i.silk = !0), b && (i.chrome = !0, i.version = b[1]), _ && (i.firefox = !0, i.version = _[1]), w && (r.firefoxos = !0, r.version = w[1]), M && (i.ie = !0, i.version = M[1]), T && (a || r.ios || u) && (i.safari = !0, r.ios || (i.version = T[1])), S && (i.webview = !0), r.tablet = !!(s || x || o && !t.match(/Mobile/) || _ && t.match(/Tablet/) || M && !t.match(/Phone/) && t.match(/Touch/)), r.phone = !(r.tablet || r.ipod || !(o || l || c || g || v || b && t.match(/Android/) || b && t.match(/CriOS\/([\d.]+)/) || _ && t.match(/Mobile/) || M && t.match(/Touch/)))
                }
                e.call(t, navigator.userAgent, navigator.platform), t.__detect = e
            }(i),
            function(t, e) {
                function r(t) {
                    return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
                }

                function i(t) {
                    return n ? n + t : t.toLowerCase()
                }
                var n, o, a, s, h, l, c, u, f, p, d = "",
                    m = {
                        Webkit: "webkit",
                        Moz: "",
                        O: "o"
                    },
                    g = window.document,
                    v = g.createElement("div"),
                    y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
                    x = {};
                t.each(m, function(t, r) {
                    if (v.style[t + "TransitionProperty"] !== e) return d = "-" + t.toLowerCase() + "-", n = r, !1
                }), o = d + "transform", x[a = d + "transition-property"] = x[s = d + "transition-duration"] = x[l = d + "transition-delay"] = x[h = d + "transition-timing-function"] = x[c = d + "animation-name"] = x[u = d + "animation-duration"] = x[p = d + "animation-delay"] = x[f = d + "animation-timing-function"] = "", t.fx = {
                    off: n === e && v.style.transitionProperty === e,
                    speeds: {
                        _default: 400,
                        fast: 200,
                        slow: 600
                    },
                    cssPrefix: d,
                    transitionEnd: i("TransitionEnd"),
                    animationEnd: i("AnimationEnd")
                }, t.fn.animate = function(r, i, n, o, a) {
                    return t.isFunction(i) && (o = i, n = e, i = e), t.isFunction(n) && (o = n, n = e), t.isPlainObject(i) && (n = i.easing, o = i.complete, a = i.delay, i = i.duration), i && (i = ("number" == typeof i ? i : t.fx.speeds[i] || t.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(r, i, n, o, a)
                }, t.fn.anim = function(i, n, d, m, g) {
                    var v, b, _, w = {},
                        M = "",
                        S = this,
                        T = t.fx.transitionEnd,
                        E = !1,
                        C = this[0];
                    if (n === e && (n = t.fx.speeds._default / 1e3), g === e && (g = 0), t.fx.off && (n = 0), C !== e && t(C).data("properties", i), "string" == typeof i) w[c] = i, w[u] = n + "s", w[p] = g + "s", w[f] = d || "linear", T = t.fx.animationEnd;
                    else {
                        b = [];
                        for (v in i) y.test(v) ? M += v + "(" + i[v] + ") " : (w[v] = i[v], b.push(r(v)));
                        M && (w[o] = M, b.push(o)), n > 0 && "object" == typeof i && (w[a] = b.join(", "), w[s] = n + "s", w[l] = g + "s", w[h] = d || "linear")
                    }
                    return _ = function(r) {
                        if ("undefined" != typeof r) {
                            if (r.target !== r.currentTarget) return;
                            t(r.target).unbind(T, _)
                        } else t(this).unbind(T, _);
                        C !== e && t(C).data("properties") == i && (C.properties = e, E = !0, t(this).css(x), m && m.call(this))
                    }, n > 0 && C !== e && (C.timeout !== e && clearTimeout(C.timeout), C.timeout = setTimeout(function() {
                        E || _.call(S)
                    }, 1e3 * (g + n) + 25)), this.size() && this.get(0).clientLeft, this.css(w), n <= 0 && setTimeout(function() {
                        S.each(function() {
                            _.call(this)
                        })
                    }, 0), this
                }, v = null
            }(i),
            function(t) {
                function e(t, e, r, i) {
                    return Math.abs(t - e) >= Math.abs(r - i) ? t - e > 0 ? "Left" : "Right" : r - i > 0 ? "Up" : "Down"
                }

                function r() {
                    c = null, f.last && (f.el.trigger("longTap"), f = {})
                }

                function i() {
                    c && clearTimeout(c), c = null
                }

                function n() {
                    s && clearTimeout(s), h && clearTimeout(h), l && clearTimeout(l), c && clearTimeout(c), s = h = l = c = null, f = {}
                }

                function o(t) {
                    return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
                }

                function a(t, e) {
                    return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
                }
                var s, h, l, c, u, f = {},
                    p = 750;
                t(document).ready(function() {
                    var d, m, g, v, y = 0,
                        x = 0;
                    "MSGesture" in window && (u = new MSGesture, u.target = document.body), t(document).bind("MSGestureEnd", function(t) {
                        var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                        e && (f.el.trigger("swipe"), f.el.trigger("swipe" + e))
                    }).on("touchstart MSPointerDown pointerdown", function(e) {
                        (v = a(e, "down")) && !o(e) || (g = v ? e : e.touches[0], e.touches && 1 === e.touches.length && f.x2 && (f.x2 = void 0, f.y2 = void 0), d = Date.now(), m = d - (f.last || d), f.el = t("tagName" in g.target ? g.target : g.target.parentNode), s && clearTimeout(s), f.x1 = g.pageX, f.y1 = g.pageY, m > 0 && m <= 250 && (f.isDoubleTap = !0), f.last = d, c = setTimeout(r, p), u && v && u.addPointer(e.pointerId))
                    }).on("touchmove MSPointerMove pointermove", function(t) {
                        (v = a(t, "move")) && !o(t) || (g = v ? t : t.touches[0], i(), f.x2 = g.pageX, f.y2 = g.pageY, y += Math.abs(f.x1 - f.x2), x += Math.abs(f.y1 - f.y2))
                    }).on("touchend MSPointerUp pointerup", function(r) {
                        (v = a(r, "up")) && !o(r) || (i(), f.x2 && Math.abs(f.x1 - f.x2) > 30 || f.y2 && Math.abs(f.y1 - f.y2) > 30 ? l = setTimeout(function() {
                            f.el.trigger("swipe"), f.el.trigger("swipe" + e(f.x1, f.x2, f.y1, f.y2)), f = {}
                        }, 0) : "last" in f && (y < 30 && x < 30 ? h = setTimeout(function() {
                            var e = t.Event("tap");
                            e.cancelTouch = n, f.el.trigger(e), f.isDoubleTap ? (f.el && f.el.trigger("doubleTap"), f = {}) : s = setTimeout(function() {
                                s = null, f.el && f.el.trigger("singleTap"), f = {}
                            }, 250)
                        }, 0) : f = {}), y = x = 0)
                    }).on("touchcancel MSPointerCancel pointercancel", n), t(window).on("scroll", n)
                }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
                    t.fn[e] = function(t) {
                        return this.on(e, t)
                    }
                })
            }(i)
    }, {}],
    13: [function(t, e, r) {
        "use strict";
        var i = t("lib/anonymous/events/MouseEvent"),
            n = e.exports = function() {
                this.$ = $(this)
            };
        n.prototype = {
            init: function() {
                var t = this;
                setTimeout(function() {
                    t._loadImg("images/shawn.jpg")
                }, 1e3), $('a[disabled="disabled"]').on(i.CLICK, function(t) {
                    t.preventDefault()
                }), this._$links = $("a[data-img]");
                for (var e = 0, r = this._$links.length; e < r; ++e) {
                    var n = this._$links[e];
                    n.innerHTML = '<span class="link__value">' + n.innerHTML + '</span><span class="link__bg"></span>', $(n).children(".link__bg").animate({
                        translate: "-101%,0"
                    }, 0)
                }
                this._$links.on(i.ENTER, $.proxy(this._onEnterEntry, this)).on(i.LEAVE, $.proxy(this._onLeaveEntry, this)),
                    Stage.$window.on(i.CLICK, $.proxy(this._onClickWindow, this)), Stage.$document.on("DOMMouseScroll.scrollable mousewheel.scrollable scroll.scrollable", $.proxy(this._onScroll, this))
            },
            _onEnterEntry: function(t) {
                this._active = !0;
                var e, r, i = t.currentTarget;
                this._clearActive();
                var n = $(i);
                n.addClass("active");
                var o = $(i).attr("data-img");
                "" !== o && (this._loadImg("/img/" + o), e = n.children(".link__bg"), r = n.children(".link__value"), r.animate({
                    color: "white"
                }, 300, Easing.outQuart), e.animate({
                    translate: "0,0"
                }, 300, Easing.outExpo))
            },
            _loadImg: function(t) {
                var e = this,
                    r = document.createElement("img");
                r.src = t, r.complete ? this._onImageLoaded(r) : $(r).on("load", function() {
                    e._onImageLoaded(r)
                })
            },
            _onLeaveEntry: function(t) {
                this._active = !1
            },
            _onClickWindow: function(t) {
                this._active || (this._clearActive(!0), this._loadImg("images/shawn.jpg"))
            },
            _onImageLoaded: function(t) {
                this.$.trigger("change", [t])
            },
            _onScroll: function(t) {
                Stage.height && (this.y = -Stage.$window.scrollTop())
            },
            _clearActive: function(t) {
                var e = this._$links.filter(".active");
                if (e.length) {
                    var r = e.children(".link__bg"),
                        i = e.children(".link__value");
                    t ? (i.animate({
                        color: "inherit"
                    }, 500, Easing.inOutExpo), r.animate({
                        translate: "-100%,0"
                    }, 500, Easing.inOutExpo)) : (i.animate({
                        color: "inherit"
                    }, 300, Easing.outQuart), r.animate({
                        translate: "-100%,0"
                    }, 300, Easing.outExpo)), e.removeClass("active")
                }
            }
        }
    }, {
        "lib/anonymous/events/MouseEvent": 6
    }],
    14: [function(t, e, r) {
        "use strict";
        var i = window.Config = e.exports = function() {};
        i.TEXTURE_WIDTH = 400
    }, {}],
    15: [function(t, e, r) {
        "use strict";
        var i = t("lib/three/Three"),
            n = t("particles/shaders/copyVs.glsl"),
            o = t("particles/shaders/copyFs.glsl"),
            a = t("particles/shaders/positionFs.glsl"),
            s = e.exports = function(t, e, r) {
                this._width = t, this._particles = t * t, this._renderer = e, this._scene = new i.Scene, this._camera = new i.Camera, this._camera.position.z = 1, this._textureInput = r, this._pingPong = !0, this.init()
            };
        s.prototype = {
            init: function() {
                var t = this._renderer.getContext();
                t.getExtension("OES_texture_float") && 0 !== t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS) && (this._dtPosition = this._initPositionTexture(), this._rtPosition1 = this.getRenderTarget(i.RGBAFormat, this._width, this._width), this._rtPosition2 = this._rtPosition1.clone(), this._copyShader = new i.RawShaderMaterial({
                    uniforms: {
                        uTexture: {
                            type: "t",
                            value: null
                        }
                    },
                    vertexShader: n(),
                    fragmentShader: o(),
                    depthTest: !1
                }), this.positionShader = new i.RawShaderMaterial({
                    uniforms: {
                        uResolutionInput: {
                            type: "v2",
                            value: new i.Vector2(this._textureInput.image.width, this._textureInput.image.height)
                        },
                        uResolutionOutput: {
                            type: "v2",
                            value: new i.Vector2(window.innerWidth, window.innerHeight)
                        },
                        uTexturePosition: {
                            type: "t",
                            value: null
                        },
                        uTexturePositionInit: {
                            type: "t",
                            value: this._dtPosition
                        },
                        uTextureInput: {
                            type: "t",
                            value: this._textureInput
                        },
                        uTextureOutput: {
                            type: "t",
                            value: null
                        },
                        uStrength: {
                            type: "f",
                            value: null
                        },
                        uFrictions: {
                            type: "f",
                            value: null
                        },
                        uSpring: {
                            type: "f",
                            value: null
                        },
                        uVelocityMax: {
                            type: "f",
                            value: null
                        },
                        uAttraction: {
                            type: "f",
                            value: null
                        },
                        uRepulsion: {
                            type: "f",
                            value: null
                        },
                        uRepulsionStrength: {
                            type: "f",
                            value: null
                        },
                        uRepulsionSensibility: {
                            type: "f",
                            value: null
                        },
                        uInvert: {
                            type: "i",
                            value: null
                        },
                        uMapStrength: {
                            type: "f",
                            value: .1
                        }
                    },
                    vertexShader: n(),
                    fragmentShader: a(),
                    depthTest: !1
                }), this._mesh = new i.Mesh(new i.PlaneBufferGeometry(2, 2), this._copyShader), this._scene.add(this._mesh), this._renderTexture(this._dtPosition, this._rtPosition1))
            },
            render: function() {
                this._pingPong ? this._renderShader(this._rtPosition1, this._rtPosition2) : this._renderShader(this._rtPosition2, this._rtPosition1), this._pingPong = !this._pingPong
            },
            resize: function(t, e) {
                this.positionShader.uniforms.uResolutionOutput.value.x = t, this.positionShader.uniforms.uResolutionOutput.value.y = e, this.positionShader.uniforms.uResolutionInput.value.x = t, this.positionShader.uniforms.uResolutionInput.value.y = e
            },
            getRenderTarget: function(t, e, r) {
                var n = new i.WebGLRenderTarget(e, r, {
                    minFilter: i.NearestFilter,
                    magFilter: i.NearestFilter,
                    format: t,
                    type: i.FloatType,
                    stencilBuffer: !1,
                    generateMipmaps: !1
                });
                return n
            },
            _renderTexture: function(t, e) {
                this._mesh.material = this._copyShader, this._copyShader.uniforms.uTexture.value = t, this._renderer.render(this._scene, this._camera, e)
            },
            _renderShader: function(t, e) {
                this._mesh.material = this.positionShader, this.positionShader.uniforms.uTexturePosition.value = t, this._renderer.render(this._scene, this._camera, e)
            },
            _initPositionTexture: function() {
                for (var t = 4, e = new Float32Array(this._particles * t), r = e.length, n = 0; n < r; n += t) {
                    var o = Math.random() * this._textureInput.image.width / this._textureInput.image.width,
                        a = Math.random() * this._textureInput.image.height / this._textureInput.image.height,
                        s = .001,
                        h = (Math.random() - .5) * s,
                        l = (Math.random() - .5) * s;
                    e[n + 0] = o, e[n + 1] = a, e[n + 2] = h, e[n + 3] = l
                }
                var c = new i.DataTexture(e, this._width, this._width, i.RGBAFormat, i.FloatType);
                return c.minFilter = i.NearestFilter, c.magFilter = i.NearestFilter, c.needsUpdate = !0, c.flipY = !1, c
            }
        }
    }, {
        "lib/three/Three": 10,
        "particles/shaders/copyFs.glsl": 19,
        "particles/shaders/copyVs.glsl": 20,
        "particles/shaders/positionFs.glsl": 23
    }],
    16: [function(t, e, r) {
        "use strict";
        var i = t("lib/three/Three"),
            n = t("particles/DoubleFBO"),
            o = t("particles/ParticlesController"),
            a = (t("particles/ParticlesGeometry"), t("particles/shaders/particlesVs.glsl")),
            s = t("particles/shaders/particlesFs.glsl"),
            h = e.exports = function(t) {
                this.$dom = t, this.init()
            };
        h.prototype = {
            init: function() {
                this._initScene()
            },
            _initScene: function() {
                if (this._canvas = document.createElement("canvas"), this._context = this._canvas.getContext("2d"), this._sceneRender = new i.Scene, this._scene = new i.Scene, this._renderCamera = new i.Camera, this._renderCamera.position.z = 1, this._textureInput = new i.Texture(this._canvas), this._textureInput.generateMipmaps = !1, this._textureInput.anisotropy = 0, this._textureInput.needsUpdate = !0, this._textureInput.minFilter = i.NearestFilter, this._textureInput.wrapS = i.ClampToEdgeWrapping, this._textureInput.wrapT = i.ClampToEdgeWrapping, this._renderer = new i.WebGLRenderer({
                        alpha: !0
                    }), this._renderer.sortObjects = !1, this._renderer.domElement.setAttribute("id", "canvas"), this.$dom.appendChild(this._renderer.domElement), this._renderer.context) {
                    var t = new i.ParticlesGeometry(Config.TEXTURE_WIDTH);
                    this._uniforms = {
                        uTexturePosition: {
                            type: "t",
                            value: null
                        },
                        uPointSize: {
                            type: "f",
                            value: 1
                        },
                        uAlpha: {
                            type: "f",
                            value: null
                        },
                        uColor: {
                            type: "c",
                            value: null
                        }
                    };
                    var e = new i.ShaderMaterial({
                            uniforms: this._uniforms,
                            vertexShader: a(),
                            fragmentShader: s(),
                            depthWrite: !1,
                            depthTest: !1,
                            transparent: !0
                        }),
                        r = new i.PointCloud(t, e);
                    this._sceneRender.add(r), this._copyMaterial = new i.MeshBasicMaterial({
                        map: null,
                        depthTest: !1,
                        depthWrite: !1
                    }), this._copyMesh = new i.Mesh(new i.PlaneBufferGeometry(2, 2), this._copyMaterial), this._scene.add(this._copyMesh), this._doubleFBO = new n(Config.TEXTURE_WIDTH, this._renderer, this._textureInput), this._particlesController = new o, $(this._particlesController).on("change", $.proxy(this._onControllerChange, this)), this._onControllerChange(), this.resize(), this.show(), console.log("Running " + Config.TEXTURE_WIDTH * Config.TEXTURE_WIDTH + " particles")
                }
            },
            destroy: function() {},
            update: function() {
                if (this._flag = !this._flag, this._doubleFBO && this._rtOutput && this._flag) {
                    if (this.needsUpdate) {
                        this.needsUpdate = !1;
                        var t, e, r, i, n = window.innerWidth,
                            o = window.innerHeight,
                            a = this._texture.width / this._texture.height,
                            s = n / o;
                        s < a ? (i = o, r = i * a, t = .5 * (n - r), e = 0) : (r = n, i = r / a, t = 0, e = .5 * (o - i)), this._context.drawImage(this._texture, t, e, r, i), this._textureInput.needsUpdate = !0
                    }
                    this._doubleFBO.render(), this._renderer.render(this._sceneRender, this._renderCamera, this._rtOutput), this._renderer.render(this._scene, this._renderCamera)
                }
            },
            show: function() {},
            resize: function() {
                if (this._doubleFBO) {
                    if (this._width = window.innerWidth, this._height = window.innerHeight, this._canvas.width = this._width, this._canvas.height = this._height, this._doubleFBO.resize(this._width, this._height), this._renderer.setSize(this._width, this._height), this._resizeTimer && clearTimeout(this._resizeTimer), this._rtOutput) {
                        var t = this;
                        this._resizeTimer = setTimeout(function() {
                            t._resetRenderTarget()
                        }, 50)
                    } else this._resetRenderTarget();
                    this._texture && (this.needsUpdate = !0)
                }
            },
            setTexture: function(t) {
                this._texture = t, this.needsUpdate = !0
            },
            _resetRenderTarget: function() {
                this._rtOutput && this._rtOutput.dispose(), this._rtOutput = new i.WebGLRenderTarget(this._width, this._height, {
                    wrapS: i.ClampToEdgeWrapping,
                    wrapT: i.ClampToEdgeWrapping,
                    minFilter: i.NearestFilter,
                    magFilter: i.NearestFilter,
                    format: i.RGBAFormat,
                    type: i.FloatType,
                    stencilBuffer: !1,
                    anisotropy: 0,
                    depthBuffer: !1,
                    generateMipmaps: !1
                }), this._copyMaterial.map = this._rtOutput, this._doubleFBO.positionShader.uniforms.uTextureOutput.value = this._rtOutput
            },
            _onControllerChange: function() {
                var t = this._particlesController.data;
                document.getElementById("canvas").style.backgroundColor = t.bgColor, this._uniforms.uPointSize.value = t.pointSize, this._uniforms.uAlpha.value = t.alpha, this._uniforms.uColor.value = new i.Color(t.particlesColor), this._doubleFBO.positionShader.uniforms.uFrictions.value = t.frictions, this._doubleFBO.positionShader.uniforms.uStrength.value = t.mapStrength, this._doubleFBO.positionShader.uniforms.uSpring.value = t.spring, this._doubleFBO.positionShader.uniforms.uVelocityMax.value = t.velocityMax, this._doubleFBO.positionShader.uniforms.uAttraction.value = t.initialAttraction, this._doubleFBO.positionShader.uniforms.uRepulsion.value = t.repulsion ? 1 : 0, this._doubleFBO.positionShader.uniforms.uRepulsionStrength.value = t.repulsionStrength, this._doubleFBO.positionShader.uniforms.uRepulsionSensibility.value = t.repulsionSensibility, this._doubleFBO.positionShader.uniforms.uMapStrength.value = t.strength, this._doubleFBO.positionShader.uniforms.uInvert.value = t.inverted ? 0 : 1
            }
        }
    }, {
        "lib/three/Three": 10,
        "particles/DoubleFBO": 15,
        "particles/ParticlesController": 17,
        "particles/ParticlesGeometry": 18,
        "particles/shaders/particlesFs.glsl": 21,
        "particles/shaders/particlesVs.glsl": 22
    }],
    17: [function(t, e, r) {
        "use strict";
        var i = e.exports = function() {
            this.init()
        };
        i.prototype = {
            init: function() {
                this.data = {
                    strength: .32,
                    initialAttraction: 0,
                    frictions: 1,
                    repulsion: !0,
                    repulsionStrength: 9e-4,
                    repulsionSensibility: .8,
                    velocityMax: .0015,
                    mapStrength: .004,
                    pointSize: 1,
                    alpha: .40,
                    inverted: !0,
                    particlesColor: "#ffffe1",
                    bgColor: "#282828"
                };
                $.proxy(this._onChange, this)
            },
            _onChange: function() {
                $(this).trigger("change")
            }
        }
    }, {}],
    18: [function(t, e, r) {
        "use strict";
        var i = t("lib/three/Three");
        i.ParticlesGeometry = e.exports = function(t) {
            this.width = t, this.n = t * t, i.BufferGeometry.call(this), this.init()
        }, i.ParticlesGeometry.prototype = Object.create(i.BufferGeometry.prototype), i.ParticlesGeometry.prototype.init = function() {
            this.positions = new Float32Array(3 * this.n), this.uvs = new Float32Array(2 * this.n);
            for (var t = 0, e = 3 * this.n; t < e; t += 3) {
                var r, n;
                n = 3, r = t / n | 0;
                var o = r % this.width / this.width,
                    a = (r / this.width | 0) / this.width,
                    s = 0,
                    h = r * n;
                this.positions[h] = o, this.positions[h + 1] = a, this.positions[h + 2] = s
            }
            this.addAttribute("uv", new i.BufferAttribute(this.uvs, 2)), this.addAttribute("position", new i.BufferAttribute(this.positions, 3))
        }, i.ParticlesGeometry.prototype.resize = function(t, e) {}
    }, {
        "lib/three/Three": 10
    }],
    19: [function(t, e, r) {
        e.exports = function(t) {
            var e = "precision mediump float; \nprecision mediump int; \n \nvarying vec2 vUv; \n \nuniform sampler2D uTexture; \n \nvoid main() \n{ \n\tgl_FragColor = texture2D(uTexture, vUv); \n} \n";
            t = t || {};
            for (var r in t) {
                var i = new RegExp("{{" + r + "}}", "g");
                e = e.replace(i, t[r])
            }
            return e
        }
    }, {}],
    20: [function(t, e, r) {
        e.exports = function(t) {
            var e = "precision mediump float; \nprecision mediump int; \n \nattribute vec3 position; \n \nattribute vec2 uv; \nvarying vec2 vUv; \n \nvoid main() \n{ \n\tvUv = uv; \n \n\tgl_Position = vec4(position, 1.0); \n} \n";
            t = t || {};
            for (var r in t) {
                var i = new RegExp("{{" + r + "}}", "g");
                e = e.replace(i, t[r])
            }
            return e
        }
    }, {}],
    21: [function(t, e, r) {
        e.exports = function(t) {
            var e = "uniform vec3 uColor; \nuniform float uAlpha; \n// uniform sampler2D uTexture; \n \n// vec3 hsv2rgb(vec3 c) \n// { \n//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0); \n//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www); \n//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); \n// } \n \nvoid main() \n{ \n\t \n\t// vec4 texture = texture2D(uTexture, p); \n\t// gl_FragColor = vec4(texture.r, texture.g, texture.b, 1.0); \n \n\t// gl_FragColor = vec4(uColor, uAlpha); \n \n\t// gradient from the center of shader pixel \n\t// vec2 center = (gl_PointCoord.xy - 0.5) * 2.0; \n\t// float len = length(center); \n\t// float a = clamp(1.0 - len, 0.0, 1.0) * uAlpha; //(1.0 - len) * uAlpha; \n \n\t// vec3 c = hsv2rgb(vec3( \n\t// \tu_hue, \n\t// \tu_saturation * len * timeFactor, \n\t// \tu_lightness + (1.0 - len) \n\t// )); \n \n\tgl_FragColor = vec4(uColor, uAlpha); \n} \n";
            t = t || {};
            for (var r in t) {
                var i = new RegExp("{{" + r + "}}", "g");
                e = e.replace(i, t[r])
            }
            return e
        }
    }, {}],
    22: [function(t, e, r) {
        e.exports = function(t) {
            var e = "precision mediump float; \nprecision mediump int; \n \nuniform sampler2D uTexturePosition; \nuniform float uPointSize; \n \n// attribute vec3 position; \n \nvoid main() \n{ \n\tvec2 uv = position.xy; \n\tvec4 tex = texture2D(uTexturePosition, uv); \n\t \n\tgl_PointSize = uPointSize; \n\tgl_Position = vec4(tex.xy * 2.0 - 1.0, 0.0, 1.0); \n} \n";
            t = t || {};
            for (var r in t) {
                var i = new RegExp("{{" + r + "}}", "g");
                e = e.replace(i, t[r])
            }
            return e
        }
    }, {}],
    23: [function(t, e, r) {
        e.exports = function(t) {
            var e = "precision mediump float; \nprecision mediump int; \n \nvarying vec2 vUv; \n \nuniform vec2 uResolutionInput; \nuniform vec2 uResolutionOutput; \n \nuniform sampler2D uTexturePosition; \nuniform sampler2D uTexturePositionInit; \nuniform sampler2D uTextureInput; \nuniform sampler2D uTextureOutput; \n \nuniform float uStrength; \nuniform float uFrictions; \nuniform float uSpring; \nuniform float uVelocityMax; \nuniform float uAttraction; \nuniform float uRepulsion; \nuniform float uRepulsionStrength; \nuniform float uRepulsionSensibility; \nuniform int uInvert; \n \nuniform float uMapStrength; \n \nuniform float uVx; \nuniform float uVy; \n \nconst float PI = 3.141592653589793; \nconst float PI_2 = PI * 2.0; \n \nvec4 normalMap(sampler2D image, vec2 uv, float strength) \n{ \n\tconst vec3 offsets = vec3(0.0, 1., -1.); \n\tvec4 left = texture2D(image, uv + offsets.zy / uResolutionOutput); \n\tvec4 right = texture2D(image, uv + offsets.xy / uResolutionOutput); \n\tvec4 top = texture2D(image, uv + offsets.xz / uResolutionOutput); \n\tvec4 bottom = texture2D(image, uv + offsets.xy / uResolutionOutput); \n\tvec4 color = vec4(1.0) - vec4((left.r - right.r) * 0.5 + 0.5, (top.r - bottom.r) * 0.5 + 0.5, 0., 1.0); \n \n\tif(uInvert == 1)  \n\t\tcolor = vec4(1.0) - color; \n \n\treturn color; \n} \n \nvoid main() \n{ \n\tvec4 tex = texture2D(uTexturePosition, vUv); \n\tvec2 position = tex.xy; \n\tvec2 velocity = tex.zw; \n\tvec2 positionInit = texture2D(uTexturePositionInit, vUv).xy; \n \n\tvec2 nm = normalMap(uTextureInput, position, uMapStrength).xy - .5; \n\t \n\tvec2 positionDelta = positionInit - position; \n \n\tvelocity += nm * uStrength; \n\tvelocity *= uFrictions; \n\tvelocity *= 0.9 + step(length(velocity), uVelocityMax) * 0.1; \n \n\tposition += velocity; \n \n\tvec2 s = step(vec2(0., 0.), position) - step(vec2(1., 1.), position); \n\tfloat isIn = s.x * s.y; \n\tposition = position * isIn + positionInit * (1. - isIn); \n\t \n\t// reset if a texel is already there \n\tvec4 outputTx = texture2D(uTextureOutput, position); \n\tfloat isAvailable = 1. - uRepulsion; \n\tisAvailable = isAvailable + step(outputTx.a, uRepulsionSensibility) * (1. - isAvailable); \n\tposition = position * isAvailable - positionInit * (1. - isAvailable); \n \n\t// gl_FragColor = vec4(.0, 1.0, 0.0, 1.0); \n\tgl_FragColor = vec4(position, velocity); \n} \n";
            t = t || {};
            for (var r in t) {
                var i = new RegExp("{{" + r + "}}", "g");
                e = e.replace(i, t[r])
            }
            return e
        }
    }, {}]
}, {}, [1]);

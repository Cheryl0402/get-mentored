/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (e, t) {
  'function' == typeof define && define.amd
    ? define('ev-emitter/ev-emitter', t)
    : 'object' == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})('undefined' != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(['ev-emitter/ev-emitter'], function (i) {
          return t(e, i);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = t(e, require('ev-emitter')))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })('undefined' != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = 'object' == typeof e && 'number' == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        'string' == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            'function' == typeof t ? (r = t) : i(this.options, t),
            r && this.on('always', r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error('Bad element for imagesLoaded ' + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        'IMG' == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll('img'), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ('string' == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once('progress', e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent('progress', [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log('progress: ' + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? 'fail' : 'done';
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent('always', [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? 'reject' : 'resolve';
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, 'naturalWidth')
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener('load', this),
            this.proxyImage.addEventListener('error', this),
            this.img.addEventListener('load', this),
            this.img.addEventListener('error', this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent('progress', [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = 'on' + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, 'onload'), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, 'onerror'), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener('load', this),
          this.proxyImage.removeEventListener('error', this),
          this.img.removeEventListener('load', this),
          this.img.removeEventListener('error', this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener('load', this),
          this.img.addEventListener('error', this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, 'naturalWidth'),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener('load', this),
          this.img.removeEventListener('error', this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent('progress', [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

// fiterizr 1.3.4 http://yiotis.net/filterizr/
!(function (t) {
  function e(i) {
    if (r[i]) return r[i].exports;
    var n = (r[i] = { i: i, l: !1, exports: {} });
    return t[i].call(n.exports, n, n.exports, e), (n.l = !0), n.exports;
  }
  var r = {};
  (e.m = t),
    (e.c = r),
    (e.d = function (t, r, i) {
      e.o(t, r) ||
        Object.defineProperty(t, r, {
          configurable: !1,
          enumerable: !0,
          get: i,
        });
    }),
    (e.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(r, 'a', r), r;
    }),
    (e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (e.p = ''),
    e((e.s = 4));
})([
  function (t, e, r) {
    'use strict';
    r.d(e, 'b', function () {
      return n;
    }),
      r.d(e, 'h', function () {
        return o;
      }),
      r.d(e, 'i', function () {
        return s;
      }),
      r.d(e, 'g', function () {
        return a;
      }),
      r.d(e, 'e', function () {
        return l;
      }),
      r.d(e, 'j', function () {
        return u;
      }),
      r.d(e, 'f', function () {
        return c;
      }),
      r.d(e, 'k', function () {
        return f;
      }),
      r.d(e, 'c', function () {
        return p;
      }),
      r.d(e, 'd', function () {
        return h;
      }),
      r.d(e, 'l', function () {
        return d;
      }),
      r.d(e, 'a', function () {
        return v;
      });
    var i =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            },
      n = function (t, e) {
        for (var r = 0; r < t.length; r++) {
          for (var i = !1, n = t[r], o = 0; o < e.length; o++)
            n === e[o] && (i = !0);
          if (!i) return !1;
        }
        return !0;
      },
      o = function (t) {
        var e = {};
        for (var r in t) e[r] = t[r];
        return e;
      },
      s = function t(e, r) {
        var n = o(r);
        for (var s in e)
          s in n
            ? 'object' !== i(n[s]) ||
              'object' !== i(e[s]) ||
              Array.isArray(e[s]) ||
              (n[s] = t('object' === i(n[s]) ? n[s] : {}, e[s]))
            : (n[s] = e[s]);
        return n;
      },
      a = function (t, e) {
        return Array.prototype.filter.call(t, function (t) {
          return e.includes(t);
        });
      },
      l = function (t, e, r) {
        var i = void 0;
        return function () {
          var n = this,
            o = arguments;
          clearTimeout(i),
            (i = setTimeout(function () {
              (i = null), r || t.apply(n, o);
            }, e)),
            r && !i && t.apply(n, o);
        };
      },
      u = function (t) {
        for (var e = t.slice(0), r = []; 0 !== e.length; ) {
          var i = Math.floor(e.length * Math.random());
          r.push(e[i]), e.splice(i, 1);
        }
        return r;
      },
      c = function (t, e) {
        if (t.length !== e.length) return !1;
        for (var r = 0; r < t.length; r++)
          if (t[r].props.index !== e[r].props.index) return !1;
        return !0;
      },
      f = function (t, e) {
        return t.slice(0).sort(
          (function (t) {
            return function (e, r) {
              var i = t(e),
                n = t(r);
              return i < n ? -1 : i > n ? 1 : 0;
            };
          })(e)
        );
      },
      p = function (t, e, r, n, o) {
        if (void 0 !== e) {
          var s = new Error(
              'Filterizr: expected type of option "' +
                t +
                '" to be "' +
                r +
                '", but its type is: "' +
                (void 0 === e ? 'undefined' : i(e)) +
                '"'
            ),
            a = !1,
            l = !1,
            u = r.includes('array');
          if (
            ((void 0 === e ? 'undefined' : i(e)).match(r)
              ? (a = !0)
              : !a && u && (l = Array.isArray(e)),
            !a && !u)
          )
            throw s;
          if (!a && u && !l) throw s;
          var c = function (t) {
            return t ? ' For further help read here: ' + t : '';
          };
          if (Array.isArray(n)) {
            var f = !1;
            if (
              (n.forEach(function (t) {
                t === e && (f = !0);
              }),
              !f)
            )
              throw new Error(
                'Filterizr: allowed values for option "' +
                  t +
                  '" are: ' +
                  n
                    .map(function (t) {
                      return '"' + t + '"';
                    })
                    .join(', ') +
                  '. Value received: "' +
                  e +
                  '".' +
                  c(o)
              );
          } else if (n instanceof RegExp) {
            var p = e.match(n);
            if (!p)
              throw new Error(
                'Filterizr: invalid value "' +
                  e +
                  '" for option "' +
                  t +
                  '" received.' +
                  c(o)
              );
          }
        }
      },
      h =
        /(^linear$)|(^ease-in-out$)|(^ease-in$)|(^ease-out$)|(^ease$)|(^step-start$)|(^step-end$)|(^steps\(\d\s*,\s*(end|start)\))$|(^cubic-bezier\((\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\))$/,
      d =
        '\n  webkitTransitionEnd.Filterizr \n  otransitionend.Filterizr \n  oTransitionEnd.Filterizr \n  msTransitionEnd.Filterizr \n  transitionend.Filterizr\n',
      v = {
        IDLE: 'IDLE',
        FILTERING: 'FILTERING',
        SORTING: 'SORTING',
        SHUFFLING: 'SHUFFLING',
      };
  },
  function (t, e, r) {
    'use strict';
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError('Cannot call a class as a function');
    }
    var n = r(2),
      o = r(0),
      s = (function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, r, i) {
          return r && t(e.prototype, r), i && t(e, i), e;
        };
      })(),
      a = window.jQuery,
      l = (function () {
        function t() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '.filtr-container',
            r = arguments[1];
          i(this, t),
            (this.$node = a(e)),
            (this.props = {
              FilterItems: this.getFilterItems(r),
              w: this.getWidth(),
              h: 0,
            }),
            this.$node.css({ padding: 0, position: 'relative' }),
            this.updateFilterItemsDimensions();
        }
        return (
          s(t, [
            {
              key: 'destroy',
              value: function () {
                this.$node
                  .attr('style', '')
                  .find('.filtr-item')
                  .attr('style', ''),
                  this.unbindEvents();
              },
            },
            {
              key: 'getFilterItems',
              value: function (t) {
                return a.map(this.$node.find('.filtr-item'), function (e, r) {
                  return new n.a(a(e), r, t);
                });
              },
            },
            {
              key: 'push',
              value: function (t, e) {
                var r = this.props.FilterItems;
                this.$node.append(t);
                var i = r.length,
                  o = new n.a(t, i, e);
                this.props.FilterItems.push(o);
              },
            },
            {
              key: 'calcColumns',
              value: function () {
                return Math.round(
                  this.props.w / this.props.FilterItems[0].props.w
                );
              },
            },
            {
              key: 'updateFilterItemsTransitionStyle',
              value: function (t, e, r, i) {
                this.props.FilterItems.forEach(function (n) {
                  return n.$node.css({
                    transition:
                      'all ' + t + 's ' + e + ' ' + n.calcDelay(r, i) + 'ms',
                  });
                });
              },
            },
            {
              key: 'updateHeight',
              value: function (t) {
                (this.props.h = t), this.$node.css('height', t);
              },
            },
            {
              key: 'updateWidth',
              value: function () {
                this.props.w = this.getWidth();
              },
            },
            {
              key: 'updateFilterItemsDimensions',
              value: function () {
                this.props.FilterItems.forEach(function (t) {
                  return t.updateDimensions();
                });
              },
            },
            {
              key: 'getWidth',
              value: function () {
                return this.$node.innerWidth();
              },
            },
            {
              key: 'bindTransitionEnd',
              value: function (t, e) {
                this.$node.on(
                  o.l,
                  Object(o.e)(function () {
                    t();
                  }, e)
                );
              },
            },
            {
              key: 'bindEvents',
              value: function (t) {
                this.$node.on('filteringStart.Filterizr', t.onFilteringStart),
                  this.$node.on('filteringEnd.Filterizr', t.onFilteringEnd),
                  this.$node.on('shufflingStart.Filterizr', t.onShufflingStart),
                  this.$node.on('shufflingEnd.Filterizr', t.onShufflingEnd),
                  this.$node.on('sortingStart.Filterizr', t.onSortingStart),
                  this.$node.on('sortingEnd.Filterizr', t.onSortingEnd);
              },
            },
            {
              key: 'unbindEvents',
              value: function () {
                this.$node.off(
                  o.l +
                    '\n      filteringStart.Filterizr \n      filteringEnd.Filterizr \n      shufflingStart.Filterizr \n      shufflingEnd.Filterizr \n      sortingStart.Filterizr \n      sortingEnd.Filterizr'
                );
              },
            },
            {
              key: 'trigger',
              value: function (t) {
                this.$node.trigger(t);
              },
            },
          ]),
          t
        );
      })();
    e.a = l;
  },
  function (t, e, r) {
    'use strict';
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError('Cannot call a class as a function');
    }
    var n = r(0),
      o = (function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, r, i) {
          return r && t(e.prototype, r), i && t(e, i), e;
        };
      })(),
      s = (function () {
        function t(e, r, n) {
          var o = this;
          i(this, t);
          var s = n.delay,
            a = n.delayMode,
            l = n.filterOutCss,
            u = n.animationDuration,
            c = n.easing;
          (this.$node = e),
            (this.props = {
              data: (function () {
                var t = o.$node.data();
                return delete t.category, delete t.sort, t;
              })(),
              index: r,
              sortData: this.$node.data('sort'),
              lastPosition: { left: 0, top: 0 },
              filteredOut: !1,
              w: this.getWidth(),
              h: this.getHeight(),
            }),
            this.$node.css(l).css({
              '-webkit-backface-visibility': 'hidden',
              perspective: '1000px',
              '-webkit-perspective': '1000px',
              '-webkit-transform-style': 'preserve-3d',
              position: 'absolute',
              transition:
                'all ' + u + 's ' + c + ' ' + this.calcDelay(s, a) + 'ms',
            }),
            this.bindEvents();
        }
        return (
          o(t, [
            {
              key: 'filterIn',
              value: function (t, e) {
                var r = Object(n.h)(e);
                (r.transform +=
                  ' translate3d(' + t.left + 'px,' + t.top + 'px, 0)'),
                  this.$node.css(r),
                  (this.props.lastPosition = t),
                  (this.props.filteredOut = !1);
              },
            },
            {
              key: 'filterOut',
              value: function (t) {
                var e = Object(n.h)(t),
                  r = this.props.lastPosition;
                (e.transform +=
                  ' translate3d(' + r.left + 'px,' + r.top + 'px, 0)'),
                  this.$node.css(e),
                  (this.props.filteredOut = !0);
              },
            },
            {
              key: 'calcDelay',
              value: function (t, e) {
                var r = 0;
                return (
                  'progressive' === e
                    ? (r = t * this.props.index)
                    : this.props.index % 2 == 0 && (r = t),
                  r
                );
              },
            },
            {
              key: 'contentsMatchSearch',
              value: function (t) {
                return Boolean(this.getContentsLowercase().includes(t));
              },
            },
            {
              key: 'getContentsLowercase',
              value: function () {
                return this.$node.text().toLowerCase();
              },
            },
            {
              key: 'getCategories',
              value: function () {
                return this.$node.attr('data-category').split(/\s*,\s*/g);
              },
            },
            {
              key: 'getHeight',
              value: function () {
                return this.$node.innerHeight();
              },
            },
            {
              key: 'getWidth',
              value: function () {
                return this.$node.innerWidth();
              },
            },
            {
              key: 'trigger',
              value: function (t) {
                this.$node.trigger(t);
              },
            },
            {
              key: 'updateDimensions',
              value: function () {
                (this.props.w = this.getWidth()),
                  (this.props.h = this.getHeight());
              },
            },
            {
              key: 'bindEvents',
              value: function () {
                var t = this;
                this.$node.on(n.l, function () {
                  var e = t.props.filteredOut;
                  t.$node.toggleClass('filteredOut', e),
                    t.$node.css('z-index', e ? -1e3 : '');
                });
              },
            },
            {
              key: 'unbindEvents',
              value: function () {
                this.$node.off(n.l);
              },
            },
          ]),
          t
        );
      })();
    e.a = s;
  },
  function (t, e, r) {
    'use strict';
    var i = {
      animationDuration: 0.5,
      callbacks: {
        onFilteringStart: function () {},
        onFilteringEnd: function () {},
        onShufflingStart: function () {},
        onShufflingEnd: function () {},
        onSortingStart: function () {},
        onSortingEnd: function () {},
      },
      controlsSelector: '',
      delay: 0,
      delayMode: 'progressive',
      easing: 'ease-out',
      filter: 'all',
      filterOutCss: { opacity: 0, transform: 'scale(0.5)' },
      filterInCss: { opacity: 1, transform: 'scale(1)' },
      layout: 'sameSize',
      multifilterLogicalOperator: 'or',
      setupControls: !0,
    };
    e.a = i;
  },
  function (t, e, r) {
    t.exports = r(5);
  },
  function (t, e, r) {
    'use strict';
    function i(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
      }
      return Array.from(t);
    }
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = r(6),
      o = r(1),
      s = r(2),
      a = r(3);
    r.d(e, 'Filterizr', function () {
      return n.a;
    }),
      r.d(e, 'FilterContainer', function () {
        return o.a;
      }),
      r.d(e, 'FilterItem', function () {
        return s.a;
      }),
      r.d(e, 'DefaultOptions', function () {
        return a.a;
      });
    var l =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            },
      u = void 0,
      c = void 0;
    (u = c = window.jQuery),
      (function (t) {
        if (!t) throw new Error('Filterizr requires jQuery to work.');
        t.fn.filterizr = function () {
          var e = '.' + t.trim(this.get(0).className).replace(/\s+/g, '.'),
            r = arguments;
          if (
            (!this._fltr && 0 === r.length) ||
            (1 === r.length && 'object' === l(r[0]))
          ) {
            var o = r.length > 0 ? r[0] : a.a;
            this._fltr = new n.a(e, o);
          } else if (r.length >= 1 && 'string' == typeof r[0]) {
            var s = r[0],
              u = Array.prototype.slice.call(r, 1),
              c = this._fltr;
            switch (s) {
              case 'filter':
                return c.filter.apply(c, i(u)), this;
              case 'insertItem':
                return c.insertItem.apply(c, i(u)), this;
              case 'toggleFilter':
                return c.toggleFilter.apply(c, i(u)), this;
              case 'sort':
                return c.sort.apply(c, i(u)), this;
              case 'shuffle':
                return c.shuffle.apply(c, i(u)), this;
              case 'search':
                return c.search.apply(c, i(u)), this;
              case 'setOptions':
                return c.setOptions.apply(c, i(u)), this;
              case 'destroy':
                return c.destroy.apply(c, i(u)), delete this._fltr, this;
              default:
                throw new Error(
                  'Filterizr: ' +
                    s +
                    ' is not part of the Filterizr API. Please refer to the docs for more information.'
                );
            }
          }
          return this;
        };
      })(c),
      (e.default = u),
      r(15);
  },
  function (t, e, r) {
    'use strict';
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError('Cannot call a class as a function');
    }
    var n = r(7),
      o = r(1),
      s = r(8),
      a = r(3),
      l = r(0),
      u = (function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, r, i) {
          return r && t(e.prototype, r), i && t(e, i), e;
        };
      })(),
      c = window.jQuery,
      f = (function () {
        function t() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '.filtr-container',
            r = arguments[1];
          i(this, t), (this.options = Object(l.i)(a.a, r));
          var s = new o.a(e, this.options);
          if (!s.$node.length)
            throw new Error(
              'Filterizr: could not find a container with the selector ' +
                e +
                ', to initialize Filterizr.'
            );
          new n.a(this, this.options.controlsSelector),
            (this.props = {
              filterizrState: l.a.IDLE,
              searchTerm: '',
              sort: 'index',
              sortOrder: 'asc',
              FilterContainer: s,
              FilterItems: s.props.FilterItems,
              FilteredItems: [],
            }),
            this.bindEvents(),
            this.filter(this.options.filter);
        }
        return (
          u(t, [
            {
              key: 'filter',
              value: function (t) {
                var e = this.props,
                  r = e.searchTerm,
                  i = e.FilterContainer,
                  n = e.FilterItems;
                i.trigger('filteringStart'),
                  (this.props.filterizrState = l.a.FILTERING),
                  (t = Array.isArray(t)
                    ? t.map(function (t) {
                        return t.toString();
                      })
                    : t.toString());
                var o = this.searchFilterItems(this.filterFilterItems(n, t), r);
                (this.props.FilteredItems = o), this.render(o);
              },
            },
            {
              key: 'destroy',
              value: function () {
                var t = this.props.FilterContainer,
                  e = this.options.controlsSelector;
                t.destroy(),
                  c(window).off('resize.Filterizr'),
                  c(e + '[data-filter]').off('click.Filterizr'),
                  c(e + '[data-multifilter]').off('click.Filterizr'),
                  c(e + '[data-shuffle]').off('click.Filterizr'),
                  c(e + '[data-search]').off('keyup.Filterizr'),
                  c(e + '[data-sortAsc]').off('click.Filterizr'),
                  c(e + '[data-sortDesc]').off('click.Filterizr');
              },
            },
            {
              key: 'insertItem',
              value: function (t) {
                var e = this.props.FilterContainer,
                  r = t.clone().attr('style', '');
                e.push(r, this.options);
                var i = this.filterFilterItems(
                  this.props.FilterItems,
                  this.options.filter
                );
                this.render(i);
              },
            },
            {
              key: 'sort',
              value: function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : 'index',
                  e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 'asc',
                  r = this.props,
                  i = r.FilterContainer,
                  n = r.FilterItems;
                i.trigger('sortingStart'),
                  (this.props.filterizrState = l.a.SORTING),
                  (this.props.FilterItems = this.sortFilterItems(n, t, e));
                var o = this.filterFilterItems(
                  this.props.FilterItems,
                  this.options.filter
                );
                (this.props.FilteredItems = o), this.render(o);
              },
            },
            {
              key: 'search',
              value: function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : this.props.searchTerm,
                  e = this.props.FilterItems,
                  r = this.searchFilterItems(
                    this.filterFilterItems(e, this.options.filter),
                    t
                  );
                (this.props.FilteredItems = r), this.render(r);
              },
            },
            {
              key: 'shuffle',
              value: function () {
                var t = this.props,
                  e = t.FilterContainer,
                  r = t.FilteredItems;
                e.trigger('shufflingStart'),
                  (this.props.filterizrState = l.a.SHUFFLING);
                var i = this.shuffleFilterItems(r);
                (this.props.FilteredItems = i), this.render(i);
              },
            },
            {
              key: 'setOptions',
              value: function (t) {
                Object(l.c)('animationDuration', t.animationDuration, 'number'),
                  Object(l.c)('callbacks', t.callbacks, 'object'),
                  Object(l.c)('controlsSelector', t.controlsSelector, 'string'),
                  Object(l.c)('delay', t.delay, 'number'),
                  Object(l.c)(
                    'easing',
                    t.easing,
                    'string',
                    l.d,
                    'https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp'
                  ),
                  Object(l.c)('delayMode', t.delayMode, 'string', [
                    'progressive',
                    'alternate',
                  ]),
                  Object(l.c)('filter', t.filter, 'string|number|array'),
                  Object(l.c)('filterOutCss', t.filterOutCss, 'object'),
                  Object(l.c)('filterInCss', t.filterOutCss, 'object'),
                  Object(l.c)('layout', t.layout, 'string', [
                    'sameSize',
                    'vertical',
                    'horizontal',
                    'sameHeight',
                    'sameWidth',
                    'packed',
                  ]),
                  Object(l.c)(
                    'multifilterLogicalOperator',
                    t.multifilterLogicalOperator,
                    'string',
                    ['and', 'or']
                  ),
                  Object(l.c)('setupControls', t.setupControls, 'boolean'),
                  (this.options = Object(l.i)(this.options, t)),
                  (t.animationDuration || t.delay || t.delayMode || t.easing) &&
                    this.props.FilterContainer.updateFilterItemsTransitionStyle(
                      t.animationDuration,
                      t.easing,
                      t.delay,
                      t.delayMode
                    ),
                  (t.callbacks || t.animationDuration) &&
                    this.rebindFilterContainerEvents(),
                  t.filter && this.filter(t.filter),
                  t.multifilterLogicalOperator &&
                    this.filter(this.options.filter);
              },
            },
            {
              key: 'toggleFilter',
              value: function (t) {
                var e = this.options.filter;
                'all' === e
                  ? (e = t)
                  : Array.isArray(e)
                  ? e.includes(t)
                    ? ((e = e.filter(function (e) {
                        return e !== t;
                      })),
                      1 === e.length && (e = e[0]))
                    : e.push(t)
                  : (e = e === t ? 'all' : [e, t]),
                  (this.options.filter = e),
                  this.filter(this.options.filter);
              },
            },
            {
              key: 'filterFilterItems',
              value: function (t, e) {
                var r = this.options.multifilterLogicalOperator;
                return 'all' === e
                  ? t
                  : t.filter(function (t) {
                      var i = t.getCategories();
                      return Array.isArray(e)
                        ? 'or' === r
                          ? Object(l.g)(i, e).length
                          : Object(l.b)(e, i)
                        : i.includes(e);
                    });
              },
            },
            {
              key: 'sortFilterItems',
              value: function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 'index',
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 'asc',
                  i = Object(l.k)(t, function (t) {
                    return 'index' !== e && 'sortData' !== e
                      ? t.props.data[e]
                      : t.props[e];
                  });
                return 'asc' === r ? i : i.reverse();
              },
            },
            {
              key: 'searchFilterItems',
              value: function (t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.props.searchTerm;
                return e
                  ? t.filter(function (t) {
                      return t.contentsMatchSearch(e);
                    })
                  : t;
              },
            },
            {
              key: 'shuffleFilterItems',
              value: function (t) {
                for (
                  var e = Object(l.j)(t);
                  t.length > 1 && Object(l.f)(t, e);

                )
                  e = Object(l.j)(t);
                return e;
              },
            },
            {
              key: 'render',
              value: function (t) {
                var e = this,
                  r = this.options,
                  i = r.filter,
                  n = r.filterInCss,
                  o = r.filterOutCss,
                  a = r.layout,
                  u = r.multifilterLogicalOperator;
                this.props.FilterItems.filter(function (t) {
                  var r = t.getCategories(),
                    n = Array.isArray(i),
                    o = t.contentsMatchSearch(e.props.searchTerm);
                  return (
                    !(n
                      ? 'or' === u
                        ? Object(l.g)(r, i).length
                        : Object(l.b)(i, r)
                      : r.includes(i)) || !o
                  );
                }).forEach(function (t) {
                  t.filterOut(o);
                });
                var c = Object(s.a)(a, this);
                t.forEach(function (t, e) {
                  t.filterIn(c[e], n);
                });
              },
            },
            {
              key: 'onTransitionEndCallback',
              value: function () {
                var t = this.props,
                  e = t.filterizrState,
                  r = t.FilterContainer;
                switch (e) {
                  case l.a.FILTERING:
                    r.trigger('filteringEnd');
                    break;
                  case l.a.SORTING:
                    r.trigger('sortingEnd');
                    break;
                  case l.a.SHUFFLING:
                    r.trigger('shufflingEnd');
                }
                this.props.filterizrState = l.a.IDLE;
              },
            },
            {
              key: 'rebindFilterContainerEvents',
              value: function () {
                var t = this,
                  e = this.props.FilterContainer,
                  r = this.options,
                  i = r.animationDuration,
                  n = r.callbacks;
                e.unbindEvents(),
                  e.bindEvents(n),
                  e.bindTransitionEnd(function () {
                    t.onTransitionEndCallback();
                  }, i);
              },
            },
            {
              key: 'bindEvents',
              value: function () {
                var t = this,
                  e = this.props.FilterContainer;
                this.rebindFilterContainerEvents(),
                  c(window).on(
                    'resize.Filterizr',
                    Object(l.e)(function () {
                      e.updateWidth(),
                        e.updateFilterItemsDimensions(),
                        t.filter(t.options.filter);
                    }, 250)
                  );
              },
            },
          ]),
          t
        );
      })();
    e.a = f;
  },
  function (t, e, r) {
    'use strict';
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError('Cannot call a class as a function');
    }
    var n = r(0),
      o = (function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, r, i) {
          return r && t(e.prototype, r), i && t(e, i), e;
        };
      })(),
      s = window.jQuery,
      a = (function () {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
          i(this, t),
            (this.props = { Filterizr: e, selector: r }),
            this.setupFilterControls(),
            this.setupShuffleControls(),
            this.setupSearchControls(),
            this.setupSortControls();
        }
        return (
          o(t, [
            {
              key: 'setupFilterControls',
              value: function () {
                var t = this.props,
                  e = t.Filterizr,
                  r = t.selector;
                s(r + '[data-filter]').on('click.Filterizr', function (t) {
                  var r = s(t.currentTarget),
                    i = r.attr('data-filter');
                  (e.options.filter = i), e.filter(e.options.filter);
                }),
                  s(r + '[data-multifilter]').on(
                    'click.Filterizr',
                    function (t) {
                      var r = s(t.target),
                        i = r.attr('data-multifilter');
                      e.toggleFilter(i);
                    }
                  );
              },
            },
            {
              key: 'setupShuffleControls',
              value: function () {
                var t = this.props,
                  e = t.Filterizr,
                  r = t.selector;
                s(r + '[data-shuffle]').on('click.Filterizr', function () {
                  e.shuffle();
                });
              },
            },
            {
              key: 'setupSearchControls',
              value: function () {
                var t = this.props,
                  e = t.Filterizr,
                  r = t.selector;
                s(r + '[data-search]').on(
                  'keyup.Filterizr',
                  Object(n.e)(function (t) {
                    var r = s(t.target),
                      i = r.val();
                    (e.props.searchTerm = i.toLowerCase()),
                      e.search(e.props.searchTerm);
                  }, 250)
                );
              },
            },
            {
              key: 'setupSortControls',
              value: function () {
                var t = this.props,
                  e = t.Filterizr,
                  r = t.selector;
                s(r + '[data-sortAsc]').on('click.Filterizr', function () {
                  var t = s(r + '[data-sortOrder]').val();
                  (e.props.sortOrder = 'asc'), e.sort(t, 'asc');
                }),
                  s(r + '[data-sortDesc]').on('click.Filterizr', function () {
                    var t = s(r + '[data-sortOrder]').val();
                    (e.props.sortOrder = 'desc'), e.sort(t, 'desc');
                  });
              },
            },
          ]),
          t
        );
      })();
    e.a = a;
  },
  function (t, e, r) {
    'use strict';
    var i = r(9),
      n = r(10),
      o = r(11),
      s = r(12),
      a = r(13),
      l = r(14),
      u = function (t, e) {
        switch (t) {
          case 'horizontal':
            return Object(i.a)(e);
          case 'vertical':
            return Object(n.a)(e);
          case 'sameHeight':
            return Object(o.a)(e);
          case 'sameWidth':
            return Object(s.a)(e);
          case 'sameSize':
            return Object(a.a)(e);
          case 'packed':
            return Object(l.a)(e);
          default:
            return Object(a.a)(e);
        }
      };
    e.a = u;
  },
  function (t, e, r) {
    'use strict';
    var i = function (t) {
      var e = t.props,
        r = e.FilterContainer,
        i = e.FilteredItems,
        n = 0,
        o = 0,
        s = i.map(function (t) {
          var e = t.props,
            r = e.w,
            i = e.h,
            s = { left: n, top: 0 };
          return (n += r), i > o && (o = i), s;
        });
      return r.updateHeight(o), s;
    };
    e.a = i;
  },
  function (t, e, r) {
    'use strict';
    var i = function (t) {
      var e = t.props,
        r = e.FilterContainer,
        i = e.FilteredItems,
        n = 0,
        o = i.map(function (t) {
          var e = t.props.h,
            r = { left: 0, top: n };
          return (n += e), r;
        });
      return r.updateHeight(n), o;
    };
    e.a = i;
  },
  function (t, e, r) {
    'use strict';
    var i = function (t) {
      var e = t.props,
        r = e.FilterContainer,
        i = e.FilteredItems,
        n = r.props.w,
        o = i[0].props.h,
        s = 0,
        a = 0,
        l = i.map(function (t) {
          var e = t.props.w;
          a + e > n && (s++, (a = 0));
          var r = { left: a, top: o * s };
          return (a += e), r;
        });
      return r.updateHeight((s + 1) * i[0].props.h), l;
    };
    e.a = i;
  },
  function (t, e, r) {
    'use strict';
    function i(t) {
      if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
      }
      return Array.from(t);
    }
    var n = function (t) {
        var e = t.props,
          r = e.FilterContainer,
          n = e.FilteredItems,
          s = r.calcColumns(),
          a = 0,
          l = Array.apply(null, Array(s)).map(Number.prototype.valueOf, 0),
          u = n.map(function (t, e) {
            var r = t.props,
              i = r.w,
              u = r.h;
            e % s == 0 && e >= s && a++;
            var c = e - s * a;
            return (l[c] += u), { left: c * i, top: o(n, s, e) };
          });
        return r.updateHeight(Math.max.apply(Math, i(l))), u;
      },
      o = function (t, e, r) {
        var i = 0;
        if (r < e - 1) return 0;
        for (r -= e; r >= 0; ) (i += t[r].props.h), (r -= e);
        return i;
      };
    e.a = n;
  },
  function (t, e, r) {
    'use strict';
    var i = function (t) {
      var e = t.props,
        r = e.FilterContainer,
        i = e.FilteredItems,
        n = r.calcColumns(),
        o = 0,
        s = i.map(function (t, e) {
          return (
            e % n == 0 && e >= n && o++,
            { left: (e - n * o) * t.props.w, top: o * t.props.h }
          );
        }),
        a = (i[0] && i[0].props.h) || 0;
      return r.updateHeight((o + 1) * a), s;
    };
    e.a = i;
  },
  function (t, e, r) {
    'use strict';
    var i = function (t) {
        var e = t.props,
          r = e.FilterContainer,
          i = e.FilteredItems,
          o = new n(r.props.w),
          s = i.map(function (t) {
            var e = t.props;
            return { w: e.w, h: e.h };
          });
        o.fit(s);
        var a = s.map(function (t) {
          var e = t.fit;
          return { left: e.x, top: e.y };
        });
        return r.updateHeight(o.root.h), a;
      },
      n = function (t) {
        this.init(t);
      };
    (n.prototype = {
      init: function (t) {
        this.root = { x: 0, y: 0, w: t };
      },
      fit: function (t) {
        var e,
          r,
          i,
          n = t.length,
          o = n > 0 ? t[0].h : 0;
        for (this.root.h = o, e = 0; e < n; e++)
          (i = t[e]),
            (r = this.findNode(this.root, i.w, i.h))
              ? (i.fit = this.splitNode(r, i.w, i.h))
              : (i.fit = this.growDown(i.w, i.h));
      },
      findNode: function (t, e, r) {
        return t.used
          ? this.findNode(t.right, e, r) || this.findNode(t.down, e, r)
          : e <= t.w && r <= t.h
          ? t
          : null;
      },
      splitNode: function (t, e, r) {
        return (
          (t.used = !0),
          (t.down = { x: t.x, y: t.y + r, w: t.w, h: t.h - r }),
          (t.right = { x: t.x + e, y: t.y, w: t.w - e, h: r }),
          t
        );
      },
      growDown: function (t, e) {
        var r;
        return (
          (this.root = {
            used: !0,
            x: 0,
            y: 0,
            w: this.root.w,
            h: this.root.h + e,
            down: { x: 0, y: this.root.h, w: this.root.w, h: e },
            right: this.root,
          }),
          (r = this.findNode(this.root, t, e)) ? this.splitNode(r, t, e) : null
        );
      },
    }),
      (e.a = i);
  },
  function (t, e, r) {},
]);

$(document).ready(function () {
  $('.filtr-container').css('visibility', 'hidden');
  $('.filtr-controls').after('<div class="filtr-loading"></div>');
  options = {
    layout: 'sameWidth',
  };
  $('.filtr-container').imagesLoaded(function () {
    var filterizd = $('.filtr-container').filterizr(options);
    $('.filtr-container').css('visibility', 'visible');
    $('.filtr-loading').remove();
  });
  $('.filtr-controls').on('click', 'span', function () {
    $('.filtr-controls').find('span').removeClass('active');
    $(this).addClass('active');
  });
});

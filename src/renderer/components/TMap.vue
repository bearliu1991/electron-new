<template>
  <div class="t_map" :style="{width:styles.width}">
    <div class="location" v-if="isShowTitle">
      <div class="name">
        海外海德胜大厦海外海德胜大厦海外海德胜大厦海外海德胜大厦海外海德胜大厦
      </div>
      <div class="address">
        111111111111111
      </div>
    </div>
    <div :id="this.mapContainer" :style="styles"></div>
  </div>
</template>
<script>
export default {
  name: 't-map',
  props: {
    id: {
      default: 0,
      type: Number
    },
    isShowTitle: {
      default: true,
      type: Boolean
    },
    styles: {
      type: Object,
      default: () => {
        return {
          width: '260px',
          height: '116px'
        }
      }
    },
    position: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mapContainer: `mapContainer${this.id}`
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      /* eslint-disable */
      let map = new qq.maps.Map(document.getElementById(this.mapContainer), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(39.916527, 116.397128),
        zoom: 8
      })
      qq.maps.event.addListener(map, 'click', () => {
        this.goBigMap()
      })
      /* eslint-enable */
    },
    goBigMap() {
      window.open(
        `https://apis.map.qq.com/uri/v1/marker?marker=coord:39.892326,116.342763;title:超好吃冰激凌;addr:手帕口桥北铁路道口&referer=LM5BZ-HMNWP-QJEDT-VJIRJ-RQ2ST-ZVB5Q`
      )
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/css/index.styl'

.t_map
  position relative
  width 260px
  margin 0 auto
  text-align left
  z-index 100
  .location
    cursor pointer
    line-height 20px
    background-color #f5f6f7
    padding 2px 0 2px 10px
    .name
      font-size 14px
      font-weight bold
      ellipsis()
    .address
      ellipsis()
      color #979899
  #mapContainer
    height 116px
</style>

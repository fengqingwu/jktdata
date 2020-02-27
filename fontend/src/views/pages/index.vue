<template>
  <div class="page-index wrap" @mousedown="mouseDown">
    <div class="comp-conf-box">
      <vue-json-pretty
        v-model="selectorCompConf"
        selectableType="single"
        :showSelectController="true"
        :selectOnClickNode="true"
        :path="'res'"
        :data="compConf"
        showLength
        showLine
        showDoubleQuotes
        highlightMouseoverNode
        highlightSelectedNode
        collapsedOnClickBrackets
        @click="handleClick"
      ></vue-json-pretty>
    </div>
    <div class="center" ref="center">
      <svg ref="svg" width="100%" height="100%">
        <defs>
          <marker
            id="arrow"
            markerUnits="strokeWidth"
            markerWidth="12"
            markerHeight="12"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            orient="auto"
          >
            <path
              id="path"
              xmlns="http://www.w3.org/2000/svg"
              d="M2,2 L10,6 L2,10 L6,6 L2,2"
              style="fill: #000000;"
            />
          </marker>
        </defs>
        <line
          id="line"
          x1="0"
          y1="0"
          x2="200"
          y2="50"
          stroke="#888"
          stroke-width="2"
          marker-end="url(#arrow)"
          stroke-dasharray="10 10"
        />
      </svg>
    </div>
    <div class="json-box">
      <vue-json-pretty
        v-model="selector"
        selectableType="single"
        :showSelectController="true"
        :selectOnClickNode="true"
        :path="'res'"
        :data="json_"
        showLength
        showLine
        showDoubleQuotes
        highlightMouseoverNode
        highlightSelectedNode
        collapsedOnClickBrackets
        @click="handleClick"
      ></vue-json-pretty>
    </div>
  </div>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";
import $ from "jquery";
export default {
  components: {
    VueJsonPretty
  },
  data() {
    return {
      selector: "",
      selectorCompConf: "",
      compConf: {
        list: []
      },
      json_: {
        status: 200,
        error: "",
        data: [
          {
            news_id: 51184,
            title:
              "iPhone X Review: Innovative future with real black technology",
            source: "Netease phone"
          },
          {
            news_id: 51183,
            title:
              "Traffic paradise: How to design streets for people and unmanned vehicles in the future?",
            source: "Netease smart"
          },
          {
            news_id: 51182,
            title:
              "Teslamask's American Business Relations: The government does not pay billions to build factories",
            source: "AI Finance",
            members: ["Daniel", "Mike", "John"]
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var center = this.$refs.center;
      $(this.$refs.svg).attr({
        width: center.offsetWidth + "px",
        height: center.offsetHeight + "px"
      });
    },
    //获取元素左上角相对于某一元素的的位置
    getElCoordinate(dom) {
      var t = dom.offsetTop;
      var l = dom.offsetLeft;
      var w = dom.offsetWidth;
      var h = dom.offsetHeight;
      dom = dom.offsetParent;
      while (!$(dom).hasClass("wrap")) {
        t += dom.offsetTop;
        l += dom.offsetLeft;
        dom = dom.offsetParent;
      }
      return {
        top: t, //Y轴坐标
        left: l, //X轴坐标
        width: w, //元素宽度
        height: h //元素高度
      };
    },
    getPos(elSource, elTarget) {
      var pos1 = this.getElCoordinate(elSource);
      var pos2 = this.getElCoordinate(elTarget);
      //分两种情况
      var x1, y1, x2, y2;
      if (pos2.top < pos1.top) {
        x1 = pos1.left + pos1.width / 2;
        y1 = pos1.top;
        y2 = pos2.top + pos2.height;
        if (pos2.left < pos1.left) {
          x2 = pos2.left + pos2.width / 2;
        } else {
          x1 = pos1.left + pos1.width / 2;
          y1 = pos1.top + pos1.height;
          x2 = pos2.left + pos2.width / 2;
          y2 = pos2.top;
        }
        return {
          start: { x: x1, y: y1 },
          end: { x: x2, y: y2 }
        };
      }
    },
    move(elSource, elTarget) {
      var pos1 = this.getElCoordinate(elSource);
      var pos2 = this.getElCoordinate(elTarget);
      var start = this.getPos(pos1, pos2).start;
      var end = this.getPos(pos1, pos2).end;

      $("#line").attr({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
      $("#path").attr({ d: "M20,20 L100,100" });
    },

    handleClick() {
      console.log(...arguments);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-index {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.6;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .comp-conf-box {
    border: 1px solid #ebebeb;
    width: 30%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .vjs-tree.is-root.has-selectable-control {
      margin-right: 30px;
      margin-left: 0;
    }
    /deep/ .vjs-radio {
      left: auto !important;
      right: -30px !important;
    }
  }
  .center {
    width: 40%;
    height: 100%;
  }
  .json-box {
    border: 1px solid #ebebeb;
    width: 30%;
    height: 100%;
    float: right;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
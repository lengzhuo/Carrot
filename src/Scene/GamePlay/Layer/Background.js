/**
 * 加载GamePlay层场景背景
 */
var GPBackgroundLayer = cc.Layer.extend({
    onEnter : function () {
        this._super();
        // 加载[背景]
        this.loadBackgound();
    },
    loadBackgound : function(){
        //获取主题Id
        var themID = GameManager.getThemeID();
        //设置关卡主题背景层
        var node = new cc.Sprite("res/GamePlay/Theme/Theme" + themID + "/BG0/BG" + themID + ".png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});
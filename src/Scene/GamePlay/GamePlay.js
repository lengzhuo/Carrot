/**
 * GamePlay场景创建 --继承 Scene方法
 */
var GamePlayScene = cc.Scene.extend({
    backgroundLayer: null, // 背景层
    mainLayer: null, // 玩法层
    uiLayer: null, // UI层
    menuLayer: null, // 菜单层
    ctor: function () {//构造函数
        this._super();
        //播放背景音乐
        cc.audioEngine.playMusic("res/Sound/GamePlay/BGMusic01.mp3", true);
    },
    onEnter: function () {
        this._super();
        // 加载[资源] --萝卜，怪兽，炮台纹理
        this.loadResource();
        // 加载[背景层]
        this.loadBackgroundLayer();
        // 加载[主层]
        this.loadMainLayer();
        // 加载[UI层]
        this.loadUILayer();
        // 注册[事件]
        this.registerEvent();
    },
    // 注册[事件]
    registerEvent: function () {
        // [事件监听]创建菜单层
        var onCreateMenuLayerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.GP_CREATE_MENU_LAYER,
            callback: this.onCreateMenuLayer
        });
        cc.eventManager.addListener(onCreateMenuLayerListener, this);

        // [事件监听]移除菜单层
        var onRemoveMenuLayerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.GP_REMOVE_MENU_LAYER,
            callback: this.onRemoveMenuLayer
        });
        cc.eventManager.addListener(onRemoveMenuLayerListener, this);
    },
    loadResource: function () {
        /**
         *cc.spriteFrameCache --用于加载.plist图集文件,把后缀.png的图片文件加入到共享的CCTextureCache中,然后解析plist文件，
         *追踪所有的Sprite在spritesheet中的位置，内部使用CCSpriteFrame对象来追踪这些信息
         */
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Carrot/Carrot1/hlb1.plist", "res/GamePlay/Carrot/Carrot1/hlb1.png");
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Tower/Bottle.plist", "res/GamePlay/Tower/Bottle.png");

        //设置 主题ID  = GameManager内提取到的关卡id
        var themeId = GameManager.getThemeID();
        //通过 themeID 加载关卡中怪物图片信息
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Object/Theme" + themeId + "/Monster/theme_" + themeId + ".plist",
            "res/GamePlay/Object/Theme" + themeId + "/Monster/theme_" + themeId + ".png");
    },
    loadBackgroundLayer: function () {
        //加载[背景层]
        var node = new GPBackgroundLayer();
        this.addChild(node);
        this.backgroundLayer = node;
    },
    loadMainLayer: function () {
        //加载[主层]
        var node = new GPMainLayer();
        this.addChild(node);
        this.mainLayer = node;
    },
    loadUILayer: function () {
        var node = new GPUILayer();
        this.addChild(node);
        this.uiLayer = node;
    },
    loadMenuLayer: function () {
        var node = new GPMenuLayer();
        this.addChild(node);
        this.menuLayer = node;
    },
    onCreateMenuLayer: function (event) {
        var self = event.getCurrentTarget();
        self.loadMenuLayer();
    },
    onRemoveMenuLayer: function (event) {
        var self = event.getCurrentTarget();
        self.removeChild(self.menuLayer);
    }
});
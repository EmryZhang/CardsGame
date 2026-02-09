import { _decorator, Component, EventTouch, Node, Sprite, tween, Vec3 } from 'cc';
import { CardModel } from '../models/CardModel';

const { ccclass, property } = _decorator;

@ccclass('CardView')
export default class CardView extends Component {
    // 引用卡牌的子节点
    @property(Sprite)
    bgSprite: Sprite = null;
    
    @property(Sprite)
    bigNumSprite: Sprite = null;
    
    @property(Sprite)
    smallNumSprite: Sprite = null;
    
    @property(Sprite)
    suitSprite: Sprite = null;
    
    // 卡牌数据
    private _cardData: CardModel = null;
    private _cardIndex: number = 0;
    private _area: string = ''; // 'table' 或 'hand'
    
    // 点击回调
    private _onClickCallback: (cardView: CardView) => void = null;
    
    onLoad() {
        console.log('CardView onLoad, 节点名称:', this.node.name);

        // 确保节点可以接收触摸事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        console.log('CardView 触摸事件监听已设置');
    }
    
    // 初始化卡牌视图
    init(cardData: CardModel, index: number, area: string): void {
        this._cardData = cardData;
        this._cardIndex = index;
        this._area = area;
        console.log('CardView init, area:', area, 'index:', index);
    }
    
    // 设置点击回调
    setClickCallback(callback: (cardView: CardView) => void): void {
        this._onClickCallback = callback;
    }
    
    // 触摸开始（添加点击效果）
    private onTouchStart(event: EventTouch): void {
        console.log('CardView onTouchStart, 节点:', this.node.name);
        tween(this.node)
            .to(0.1, { scale: new Vec3(0.95, 0.95, 1) })
            .start();
    }
    
    // 触摸结束（触发点击事件）
    private onTouchEnd(event: EventTouch): void {
        // 恢复大小
        tween(this.node)
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .start();
        
        // 触发点击回调
        if (this._onClickCallback) {
            this._onClickCallback(this);
        }
    }
    
    // 触摸取消（恢复状态）
    private onTouchCancel(event: EventTouch): void {
        tween(this.node)
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .start();
    }
    
    // 获取卡牌数据
    getCardData(): CardModel {
        return this._cardData;
    }
    
    // 获取卡牌索引
    getCardIndex(): number {
        return this._cardIndex;
    }
    
    // 获取卡牌区域
    getCardArea(): string {
        return this._area;
    }
    
    onDestroy() {
        // 清理事件监听
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
}

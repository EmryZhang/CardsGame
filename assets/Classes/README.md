# 卡牌游戏数据管理架构说明

## 概述

本项目实现了统一的数据管理架构，将静态配置、动态运行时数据和通用工具方法进行了模块化封装。

## 核心模块

### 1. DataManager (数据管理器)
**位置**: `assets/Classes/managers/DataManager.ts`

**功能**:
- 统一管理静态关卡配置数据
- 管理运行时动态数据（桌面牌、手牌）
- 支持操作步骤的保存和撤销
- 提供便捷的卡牌查询接口

**主要方法**:
```typescript
// 加载关卡
await DataManager.instance.loadLevel(levelId: number)

// 获取桌面卡牌
DataManager.instance.tableCards

// 获取手牌
DataManager.instance.handCards

// 获取手牌最后一张
DataManager.instance.getLastHandCard()

// 判断两张牌是否可以匹配（点数绝对值差1）
DataManager.instance.canMatch(tableCard, handCard)

// 执行匹配操作
DataManager.instance.executeMatch(tableCardId: string)

// 替换手牌最后一张
DataManager.instance.replaceLastHandCard(cardId: string)

// 撤销上一步操作
DataManager.instance.undo()

// 检查是否可以撤销
DataManager.instance.canUndo()

// 清空历史记录
DataManager.instance.clearHistory()

// 获取历史记录数量
DataManager.instance.getHistoryCount()
```

### 2. CardUtils (卡牌工具类)
**位置**: `assets/Classes/utils/CardUtils.ts`

**功能**:
- 提供卡牌相关的通用工具方法
- 判断花色颜色、获取卡牌名称等

**主要方法**:
```typescript
// 判断花色是否为红色
CardUtils.isRedSuit(suit: number)

// 判断花色是否为黑色
CardUtils.isBlackSuit(suit: number)

// 获取花色符号（♣、♦、♥、♠）
CardUtils.getSuitSymbol(suit: number)

// 获取点数文本（A、2-10、J、Q、K）
CardUtils.getFaceText(face: number)

// 获取卡牌完整名称（如：♣A）
CardUtils.getCardName(suit: number, face: number)

// 获取点数对应的数组索引（0-12）
CardUtils.getFaceIndex(face: number)

// 判断是否为花牌（J、Q、K）
CardUtils.isFaceCard(face: number)

// 判断是否为A
CardUtils.isAce(face: number)

// 获取点数的数值
CardUtils.getFaceValue(face: number)

// 比较两张牌的点数大小
CardUtils.compareFace(face1: number, face2: number)
```

### 3. RuntimeCardData (运行时卡牌数据)
**位置**: `assets/Classes/models/RuntimeCardData.ts`

**功能**:
- 继承静态配置数据
- 管理卡牌的动态状态
- 支持单张卡牌的状态保存和回退

**主要属性**:
```typescript
// 卡牌唯一ID
public readonly id: string

// 静态配置数据
public readonly config: CardConfig

// 是否正面朝上
public isFaceUp: boolean

// 是否被锁定（不可移动）
public isLocked: boolean

// 当前所在区域（table/hand等）
public currentArea: string

// 当前位置
public position: { x: number; y: number }

// 层级
public zIndex: number
```

**主要方法**:
```typescript
// 保存当前状态到历史记录
cardData.saveState()

// 回退到上一个状态
cardData.restoreState()

// 清空历史记录
cardData.clearHistory()

// 获取历史记录数量
cardData.getHistoryCount()
```

### 4. LevelController (关卡控制器)
**位置**: `assets/Classes/controllers/LevelController_new.ts`

**功能**:
- 管理卡牌视图的创建和更新
- 处理卡牌点击事件
- 协调数据管理和视图更新

**主要方法**:
```typescript
// 处理桌面卡牌点击事件
onTableCardClick(cardNode: Node)

// 处理手牌点击事件
onHandCardClick(cardNode: Node)

// 撤销上一步操作
onUndoClick()
```

## 游戏流程

### 1. 初始化流程
```typescript
// 1. 初始化游戏配置
await GameConfig.instance.initialize()

// 2. 加载关卡
await DataManager.instance.loadLevel(1)

// 3. 创建卡牌视图
this.createCardsFromData()
```

### 2. 匹配流程
```typescript
// 1. 玩家点击桌面卡牌
onTableCardClick(cardNode)

// 2. 检查是否可以匹配
if (DataManager.instance.canMatch(tableCard, handCard)) {
    // 3. 执行匹配操作
    DataManager.instance.executeMatch(tableCardId)
    // 4. 更新视图
    refreshCardDisplay(cardNode, cardData)
    removeLastHandCardView()
}
```

### 3. 替换流程
```typescript
// 1. 玩家点击手牌
onHandCardClick(cardNode)

// 2. 执行替换操作
if (DataManager.instance.replaceLastHandCard(cardId)) {
    // 3. 更新视图
    refreshHandCardsDisplay()
}
```

### 4. 撤销流程
```typescript
// 1. 玩家点击撤销按钮
onUndoClick()

// 2. 执行撤销操作
if (DataManager.instance.undo()) {
    // 3. 更新视图
    refreshAllCardsDisplay()
}
```

## 数据结构

### 静态配置 (CardConfig)
```typescript
interface CardConfig {
    CardFace: number;  // 点数（1-13）
    CardSuit: number;  // 花色（0-3）
    Position: {
        x: number;
        y: number;
    };
}
```

### 运行时数据 (RuntimeCardData)
```typescript
class RuntimeCardData {
    id: string
    config: CardConfig
    isFaceUp: boolean
    isLocked: boolean
    currentArea: string
    position: { x: number; y: number }
    zIndex: number
}
```

## 注意事项

1. **数据同步**: 所有卡牌数据的修改都应该通过DataManager进行，确保数据一致性
2. **视图更新**: 数据修改后需要手动刷新对应的视图
3. **历史记录**: 历史记录默认最多保存50步，可以通过修改`_maxHistorySize`调整
4. **卡牌ID**: 卡牌ID在创建时自动生成，格式为`table_${index}`或`hand_${index}`

## 扩展建议

1. 添加更多游戏操作类型（如：移动、翻转等）
2. 实现多关卡进度保存
3. 添加游戏状态持久化
4. 优化历史记录的存储方式，减少内存占用

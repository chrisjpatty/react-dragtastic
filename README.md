![react-dragtastic](https://raw.githubusercontent.com/chrisjpatty/react-dragtastic/master/logo.png)

# react-dragtastic
A simple drag and drop library for React which uses the more stable mouseDown/mouseUp pattern instead of the problematic HTML5 drag and drop API.

Drag and drop interfaces are complicated and difficult to properly program, this package attempts to alleviate some of the common hangups with drag and drop libraries. It should be noted that there are more mature solutions available such as the excellent [react-dnd](https://github.com/react-dnd/react-dnd) package, however for many simple drag and drop applications, the implementation of such packages can quickly become arduous.

* _Warning, version 2 represents a significant rewrite of version 1 of_  `react-dragtastic`. _The API is completely different, but with the changes come several stability improvements, primitive mobile support, and significantly increased render flexibility. Be sure you're ready to rewrite your drag-and-drop implementation before upgrading from version 1._

## Example

[Code Sandbox Example](https://codesandbox.io/s/5z32yqk7l4)
_More examples coming soon_

## Installation

```shell
npm install --save react-dragtastic
or
yarn add react-dragtastic
```

## Usage

###### For ES6 and up
```javascript
import { Draggable, Droppable, DragComponent } from 'react-dragtastic';
```

###### For ES5
```javascript
var dnd = require("react-dragtastic");
var Draggable = dnd.Draggable;
var Droppable = dnd.Droppable;
var DragComponent = dnd.DragComponent;
```

## Overview

`react-dragtastic` makes use of three different components, a `<Draggable/>` component which defines a zone on a page which can then trigger drag events, a `<Droppable/>` component, which defines zones which trigger drop events, and a `<DragComponent/>` component which defines the component that follows the user's pointer around the page while dragging.

`react-dragtastic` uses the "function-as-child" component pattern to give you full control over the rendering details of each component.

### Draggable

This defines a draggable zone. At a minimum, spread the events over the element that should be draggable (usually the root element).

- `id`: An id which will be used in the draggable zone's target `<DragComponent/>`
- `type`: A string, or array of strings, used to limit which droppable zones will accept `<DragComponent/>`'s attached to this draggable.
- `data`: Data of any type which will be passed to the `onDrop` function of any `<Droppable/>` which accepts this `<Draggable/>`'s type.
- `onDragStart`: A function which will be called when the `<Draggable/>` zone is activated (The user started dragging).
- `onDragEnd`: A function which will be called when the `<Draggable/>` zone is deactivated (The user stopped dragging).

```jsx
class DraggableZone extends React.Component{
  render(){
    return(
      <Draggable
        id="unique-id"
        type="apple"
      >
        {
          dragState => (
            <div {...dragState.events}>
              I'm a draggable zone
            </div>
          )
        }
      </Draggable>
    )
  }
}
```

### Droppable

This defines a droppable zone. At a minimum, spread the events over the element that should be droppable (usually the root element).

- `accepts`: A string type corresponding to the `type` property of the `<Draggable/>` zone for which this `<Droppable/>` should accept drop events.
- `onDrop`: A function which will be called when a user drops a `<DragComponent/>` on this `<Droppable/>` with an accepted type.

Properties available from `dragState`:
- All the properties listed in the dragState section.
- `isOver`: a boolean representing whether the user is currently hovering the `<Droppable/>`

```jsx
class DroppableZone extends React.Component{
  render(){
    return(
      <Droppable
        accepts='apple'
      >
        {
          dragState => (
            <div {...dragState.events}>
              I'm a droppable zone
            </div>
          )
        }
      </Droppable>
    )
  }
}
```

### DragComponent

By default, children passed to this component will only render if the user is currently dragging.

- `for`: A string corresponding to the `id` property of the `<Draggable/>` zone that should trigger this component to start rendering.
- `onDrag`: A function which will be called every time a user drags.

Properties available from `dragState`:
- All the properties listed in the dragState section.
- `isOverAccepted`: a boolean representing whether the user is currently hovering a `<Droppable/>` that accepts the `type` of the currently active `<Draggable/>`

```jsx
class DragComponent extends React.Component{
  render(){
    return(
      <DragComponent
        for='unique-id'
      >
        {
          dragState => (
            <div
              style={{
                position: 'fixed',
                left: dragState.x,
                top: dragState.y
              }}
            >
              I will render when my Draggable zone is activated
            </div>
          )
        }
      </DragComponent>
    )
  }
}
```

### dragState

All components imported from `react-dragtastic` have access the global dragState with the following properties:
- `x`: The user's current horizontal position on the page.
- `y`: The user's current vertical position on the page.
- `startingX`: The user's initial horizontal position on the page when they started dragging.
- `startingy`: The user's initial vertical position on the page when they started dragging.
- `isDragging`: A boolean representing whether the user is currently dragging.
- `currentlyDraggingId`: The id of the currently dragging element.
- `currentlyHoveredDroppableId`: The id of the `<Droppable/>` currently being hovered.
- `currentlyHoveredDroppableAccepts`: The `accepts` property of the `<Droppable/>` currently being hovered.
- `data`: Data from the `data` property of the `<Draggable/>` which is currently active. `null` if not dragging.
- `type`: The type of the component being currently dragged. `null` if not dragging.

## Coming Soon

- A project website with live examples.
- Screencast showing basic implementation examples.
- Improved mobile support.
- Additional event hooks

## Contributing

Contributions of any kind are welcome. Please feel free to file issues, submit pull-requests, or drop us a line with feature requests.

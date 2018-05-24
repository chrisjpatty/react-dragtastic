// @flow

import * as React from 'react'
import { DragComponent, Draggable, Droppable, DragState } from './'

{
  ;[
    <DragComponent>{() => null}</DragComponent>,
    <DragComponent for={1}>{() => null}</DragComponent>,
    <DragComponent for={''}>{() => null}</DragComponent>,
    <DragComponent alwaysRender={true}>{() => null}</DragComponent>,
    <DragComponent subscribeTo={[]}>{() => null}</DragComponent>,
    <DragComponent subscribeTo={['key1']}>{() => null}</DragComponent>,
    <DragComponent for={''}>
      {params => {
        ;(params.isOverAccepted: boolean)
        ;(params.x: number)
        // $FlowFixMe
        ;(params.isOverAccepted: number)
        // $FlowFixMe
        ;(params.x: boolean)
        return null
      }}
    </DragComponent>,
    // $FlowFixMe
    <DragComponent alwaysRender={5}>{() => null}</DragComponent>,
    // $FlowFixMe
    <DragComponent for={true}>{() => null}</DragComponent>,
    // $FlowFixMe
    <DragComponent />,
    // $FlowFixMe
    <DragComponent subscribeTo={[0]}>{() => null}</DragComponent>
  ]
}

{
  ;[
    <Draggable subscribeTo={null}>{() => null}</Draggable>,
    <Draggable subscribeTo={[]}>{() => null}</Draggable>,
    <Draggable subscribeTo={['key1']}>{() => null}</Draggable>,
    <Draggable>
      {params => {
        ;(params.x: number)
        ;(params.isActive: boolean)
        ;(params.events: Object)
        // $FlowFixMe
        ;(params.events: null)
        // $FlowFixMe
        ;(params.x: boolean)
      }}
    </Draggable>,
    // $FlowFixMe
    <Draggable id={false}>{() => null}</Draggable>,
    // $FlowFixMe
    <Draggable />,
    // $FlowFixMe
    <Draggable subscribeTo={[0]}>{() => null}</Draggable>
  ]
}

{
  ;[
    <Droppable id="">{() => null}</Droppable>,
    <Droppable subscribeTo={[]}>{() => null}</Droppable>,
    <Droppable subscribeTo={['key1']}>{() => null}</Droppable>,
    <Droppable>
      {params => {
        ;(params.x: number)
        ;(params.events: Object)
        // $FlowFixMe
        ;(params.events: null)
        // $FlowFixMe
        ;(params.x: boolean)
      }}
    </Droppable>,
    // $FlowFixMe
    <Droppable />,
    // $FlowFixMe
    <Droppable subscribeTo={[0]}>{() => null}</Droppable>
  ]
}

{
  ;[
    <DragState subscribeTo={[]}>{() => null}</DragState>,
    <DragState subscribeTo={['key1']}>{() => null}</DragState>,
    <DragState>
      {params => {
        ;(params.x: number)
        // $FlowFixMe
        ;(params.x: boolean)
      }}
    </DragState>,
    // $FlowFixMe
    <DragState />,
    // $FlowFixMe
    <DragState subscribeTo={[0]}>{() => null}</DragState>
  ]
}

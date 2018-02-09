// @flow

import * as React from 'react'
import { DragComponent, Draggable, Droppable, DragState } from './'

{
  ;[
    <DragComponent>{() => null}</DragComponent>,
    <DragComponent for={1}>{() => null}</DragComponent>,
    <DragComponent for={''}>{() => null}</DragComponent>,
    <DragComponent alwaysRender={true}>{() => null}</DragComponent>,
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
    <DragComponent />
  ]
}

{
  ;[
    <Draggable id={''}>
      {params => {
        ;(params.x: number)
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
    <Draggable />
  ]
}

{
  ;[
    <Droppable>
      {params => {
        ;(params.x: number)
        ;(params.isOver: boolean)
        ;(params.events: Object)
        // $FlowFixMe
        ;(params.events: null)
        // $FlowFixMe
        ;(params.isOver: number)
        // $FlowFixMe
        ;(params.x: boolean)
      }}
    </Droppable>,
    // $FlowFixMe
    <Droppable />
  ]
}

{
  ;[
    <DragState>
      {params => {
        ;(params.x: number)
        // $FlowFixMe
        ;(params.x: boolean)
      }}
    </DragState>,
    // $FlowFixMe
    <DragState />
  ]
}

import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import * as PopoverMenu from '@/src/components/ui/PopoverMenu'

import { Toolbar } from '@/src/components/ui/Toolbar'
import { isRowGripSelected } from './utils'
import { Icon } from '@/src/components/ui/Icon'
import { MenuProps, ShouldShowProps } from '@/src/components/menus/types'

export const TableRowMenu = React.memo(({ editor, appendTo, lang }: MenuProps | any): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({ editor, view, state, from })
    },
    [editor],
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowUpToLine" />}
          close={false}
          label={lang.extension.Table.menus.TableRow.addBefore}
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowDownToLine" />}
          close={false}
          label={lang.extension.Table.menus.TableRow.addAfter}
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item icon="Trash" close={false} label={lang.extension.Table.menus.TableRow.delete} onClick={onDeleteRow} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
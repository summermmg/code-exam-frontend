import { render, screen, fireEvent } from '@testing-library/react';
import Item from "../Item";

const mockedOnLeftclick = jest.fn();
const mockedOnRightclick = jest.fn();

describe('Item', () => {
    test('should set items data when item is right clicked', () => {
        render(
            <Item 
                item={{}}
                onLeftClick={mockedOnLeftclick}
                onRightClick={mockedOnRightclick}
            />
        );
        const liElement = screen.getByRole("listitem");
        fireEvent.contextMenu(liElement)
        expect(mockedOnRightclick).toBeCalled()
    })

    test('should set items data when item is left clicked', () => {
        render(
            <Item 
                item={{}}
                onLeftClick={mockedOnLeftclick}
                onRightClick={mockedOnRightclick}
            />
        );
        const liElement = screen.getByRole("listitem");
        fireEvent.click(liElement);
        expect(mockedOnLeftclick).toBeCalled()
    })
})
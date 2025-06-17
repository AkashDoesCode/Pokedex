import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl } from '../../features/Pokemon/pokemonSlice';


const optionLists = ["10", "20", "50", "100"];

function PaginatedList() {


    const {pageSize} = useSelector((state) => state.pokemon);
    const [isOpen, setIsOpen] = useState(false);
    const [showToolTip, setVisible] = useState(false);
    
    const [inputValue, setInputValue] = useState(pageSize);

    const boxref = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleOpenList = (event) => {
            if (boxref.current && !boxref.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleOpenList);

        return () => {
            document.removeEventListener('mousedown', handleOpenList);
        }
    }, [isOpen]);

    const handleSubmit = (value) => {
        if(value == "") return ;
        value = Math.round(value);
        const url = "https://pokeapi.co/api/v2/pokemon?limit=" + value?.toString();
        dispatch(updateUrl(url));
    }

    const handleKeyDown = (event) => {
        if(event.key == "Enter")
            handleSubmit(inputValue);
    }

    return (
        <div ref={boxref} className="absolute group z-50 left-[12.5%] -translate-x-full ml-10 top-[86px] w-20 h-20">
            <FontAwesomeIcon onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setVisible(true)} className='text-gray-400 absolute top-2 h-3 w-3 left-2' icon={faInfoCircle} />
            {showToolTip && <div className="absolute z-60 bottom-full left-full transform -translate-x-1/2 mb-2  group-hover:block bg-slate-300 text-gray-600 text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                How many card do you want?
                <div className='absolute left-[14px] top-4 -z-10 transform rotate-45 h-4 w-4 bg-slate-300'></div>
            </div>}
            <input onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} onFocus={() => setIsOpen(true)} type="number" className="w-full rounded-lg shadow-xl border-none outline-none pl-9 pr-3 py-1 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  value={inputValue}/>
            <ul className="bg-white mt-2 rounded-lg font-serif text-gray-500 shadow-xl">
                {isOpen && optionLists.map((option) =>
                    <li onClick={() => handleSubmit(option)} key={option} className="text-center cursor-pointer">
                        {option}
                    </li>
                )}
            </ul>

        </div>
    )
}

export default PaginatedList
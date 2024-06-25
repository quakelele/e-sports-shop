import s from './SearchBar.module.scss'
import search from '@assets/search-icon.png'

type Props = {
    inputValue: string
    setInputValue: (arg: string) => void
}

export const SearchBar = ({ inputValue, setInputValue }: Props) => (
    <div className={s.wrapper}>
        <img onClick={() => setInputValue('')} src={search} alt="" />
        <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search for anything.."
        />
    </div>
)

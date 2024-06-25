import s from "./Sort.module.scss";
import { useState } from "react";
import sortButton from "@assets/sorting-filter-icon.png";
import { Col, InputNumber, Slider } from "antd";
import { Category, UpdateFilters } from "../../Api/types";

type Props = {
  category: Category[];
  setCategory: (arg: Category[]) => void;
  setUpdateFilters: (arg: UpdateFilters) => void;
};

export const Sort = ({ category, setCategory, setUpdateFilters }: Props) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([0, 500]); // Состояние для значения бегунков

  const checkBoxHandler = (name: string) => {
    const updateCheckBoxStatus = category.map((item) => {
      if (item.name === name) {
        return { ...item, check: !item.check };
      }
      return item;
    });
    setCategory(updateCheckBoxStatus);
  };

  const onChangeComplete = () => {
    const updatedCategory = category
      .filter((item) => item.check === true)
      .map((item) => item.name);
    setUpdateFilters({
      category: updatedCategory,
      searchPrice: { from: range[0], to: range[1] },
    });
  };

  // Обработчики изменения значения бегунков

  const handleRightInputChange = (value: number | null) => {
    if (!value) {
      return;
    }
    setRange([range[0], value]);
  };

  const handleLeftInputChange = (value: number | null) => {
    value && setRange([value, range[1]]);
  };

  return (
    <div className={s.sortWrapper}>
      <img
        onClick={() => setOpen(!open)}
        src={sortButton}
        width={53}
        height={48}
        alt=""
      />
      <div className={open ? s.dropMenuHeight : s.dropMenu}>
        <ul>
          {category.map((category) => (
            <li key={category.id}>
              <input
                onChange={() => checkBoxHandler(category.name)}
                type="checkbox"
                checked={category.check}
              />
              {category.name}
            </li>
          ))}
          <Col span={15}>
            <Slider
              range={{ draggableTrack: true }}
              step={1}
              min={0}
              max={1000}
              onChange={setRange}
              value={range}
            />
            <InputNumber
              step={20}
              style={{ margin: "0 16px" }}
              value={range[0]}
              onChange={handleLeftInputChange} // Обработчик изменения значения левого бегунка
            />
            <InputNumber
              step={20}
              style={{ margin: "0 16px" }}
              value={range[1]}
              onChange={handleRightInputChange} // Обработчик изменения значения правого бегунка
            />
          </Col>
        </ul>
        <button onClick={onChangeComplete}>Beeep..</button>
      </div>
    </div>
  );
};

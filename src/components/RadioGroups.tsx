import { FormEvent, Fragment, useState } from "react";
import styles from './radioGroups.module.css';
import cn from 'classnames';
import { Icon } from './Buttons';

type GroupsList = {
  label: string;
  value: string;
}

interface IRadioProps {
  name: string;
  lists: GroupsList[];
  onSubmit: (e: FormEvent) => void;
}

const RadioGroups = ({name, lists, onSubmit}: IRadioProps) => {
  const [checkType, setCheckType] = useState<string>(lists[0].value);
  const handleCheckedValue = (type: string) => {
    setCheckType(type);
  }

  return (
    <form className={styles.groups} onSubmit={onSubmit}>
      {lists.map((list) => {
        return (
          <Fragment key={list.value}>
            <label htmlFor={list.value}>
              <input defaultChecked={checkType === list.value} className={styles.hidden} type="radio" name={name} value={list.value} />
            </label>
            <div className={cn({[styles.fill_check]: checkType === list.value})}>
              <Icon.Check label={list.label} onClick={() => handleCheckedValue(list.value)}/>
            </div>
          </Fragment>
        )
      })}
    </form>
  )
}

export default RadioGroups;
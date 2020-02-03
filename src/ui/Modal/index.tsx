import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.sass';
const cx = classNames.bind(styles);

interface ModalProps {
    active: boolean,
    children: React.ReactNode
}

const Modal = (props: ModalProps) => {
    const { active = false, children } = props;
    const overlayStyle = cx({
        'modal': true,
        'modal--visible': active
    });
    
    return (
        <div className={ overlayStyle }>
            <div className={ styles.dialog }>
                { children }
            </div>
        </div>
    );
};

export default Modal;
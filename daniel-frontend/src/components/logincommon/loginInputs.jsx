import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';

const LoginInputs = ({ label, type, name, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputId = `input-${name}`;

    return (
        <div>
            {label && (
                <label htmlFor={inputId} style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <input
                    id={inputId}
                    type={isPassword && showPassword ? 'text' : type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: isPassword ? '10px 40px 10px 10px' : '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                {isPassword && (
                    <div
                        onClick={() => setShowPassword(prev => !prev)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '12px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                    >
                        {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                    </div>
                )}

            </div>
        </div>
    );
};

export default LoginInputs;

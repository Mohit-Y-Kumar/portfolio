import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './specialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slices/userSlices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();

    const handleUpdatePassword = () => {
        dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
            dispatch(resetProfile());
            dispatch(getUser());
            toast.success(message);
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, isAuthenticated, error, message,isUpdated]);
    
    return (
        <>
            <div className="w-full h-full ">
                <div>
                    <div className="grid w-[100%] gap-6">
                        <div className="grid gap-2 mb-4">
                            <h1 className="text-3xl font-bold">Update Password</h1>
                            <p className="text-balance text-muted-foreground ">
                                Update Your Password
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Current Password</Label>
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Confirm New Password</Label>
                            <Input
                                type="password"
                                placeholder=" Confirm New Password"

                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            {!loading ? (
                                <Button
                                    onClick={() => handleUpdatePassword()}
                                    className="w-full text-white"
                                >
                                    Update Password
                                </Button>
                            ) : (
                                <SpecialLoadingButton content={"Updating Password"} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default UpdatePassword

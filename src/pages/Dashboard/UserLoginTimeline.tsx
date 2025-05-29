import AvatarInitials from '@/components/AvatarInitials';
import { SERVICE } from '@/constants/services';
import { useGetCall } from '@/hooks';
import Lib from '@/utils/Lib';
import moment from 'moment';

const UserLoginTimeline = () => {
    const { data, loading } = useGetCall(SERVICE.RECENT_LOGIN);

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Recent Login</h5>
            </div>
            <div className="mb-5">
                <div className="max-w-[900px] mx-auto text-center ltr:sm:text-left rtl:sm:text-right space-y-3 sm:space-y-0">
                    {data?.data?.length ? (
                        data.data.map((item: any, index: number) => (
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">
                                    {moment(item.login_time).format('HH:MM')}

                                    <span className="text-[8px] px-1">
                                        {moment(item.login_time).format('YY-MM-DD')}
                                    </span>
                                </p>
                                <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                                    {/*  */}
                                    {item.avatar ? (
                                        <img
                                            src={
                                                item.avatar.startsWith('https')
                                                    ? item.avatar
                                                    : Lib.cloudImg(item.avatar)
                                            }
                                            alt="img"
                                            className="w-11 h-11 rounded-full relative z-[1] mx-auto"
                                        />
                                    ) : (
                                        <AvatarInitials name={item.name} />
                                    )}
                                </div>

                                <div>
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[11px] px-2.5 py-0">
                                        {item.name}
                                    </p>
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5 py-0">
                                        {item.email}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h5 className="font-semibold text-lg dark:text-white-light">No Login's Found</h5>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserLoginTimeline;

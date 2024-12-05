import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Button from '~/components/Button';

function InputBasic() {
    return (
        <>
            <div className="flex justify-between space-x-3">
                <Input placeholder="Add chapter name" className="lg:!w-[60%]" />
                <Select
                    className="!flex-1"
                    defaultValue={''}
                    options={[
                        {
                            value: '',
                            label: 'Type',
                        },
                        {
                            value: 1,
                            label: 'Translate',
                        },
                        {
                            value: 2,
                            label: 'Beta',
                        },
                    ]}
                />
                <Select
                    className="!flex-1"
                    defaultValue={''}
                    options={[
                        {
                            value: '',
                            label: 'Language',
                        },
                        {
                            value: 1,
                            label: 'English',
                        },
                        {
                            value: 2,
                            label: 'Laos',
                        },
                    ]}
                />
                <Button>Find</Button>
            </div>
            <div className="space-x-3">
                <DatePicker
                    format={'MM/DD/YYYY'}
                    defaultValue={dayjs(new Date().toLocaleDateString('en-GB'), 'MM/DD/YYYY')}
                />
                <Select
                    className="!w-[150px]"
                    defaultValue={''}
                    options={[
                        {
                            value: '',
                            label: 'Status',
                        },
                        {
                            value: 1,
                            label: 'Finish',
                        },
                        {
                            value: 2,
                            label: 'On going',
                        },
                        {
                            value: 2,
                            label: 'Over deadline',
                        },
                    ]}
                />
            </div>
        </>
    );
}

export default InputBasic;

import { IconArrowLeft, IconPoint } from '@tabler/icons-react';

import { Quest } from '../types';

type Props = {
  data?: Quest;
};
// #3c291f
export const QuestExample: React.FC<Props> = ({ data }) => {
  return (
    <section className="bg-[#fde9c7] px-6 pt-5 pb-14 space-y-5">
      <div className="flex items-center gap-x-3 text-[#a8663f] font-bold">
        <IconArrowLeft /> {data?.name}
      </div>
      <section className="bg-[#f3c697] rounded-2xl px-6 py-5">
        <div className="text-[#a8663f] font-bold text-xl border-b pb-2 border-[#644037] w-full">
          Requirement
        </div>
        <section className="pt-2">
          {data?.requirements.map((item, index) => (
            <div
              key={`Requirement_${index}`}
              className="pt-1 text-[#a8663f] flex items-center gap-x-3 text-sm"
            >
              <IconPoint />
              <span className="font-bold">
                {item.description}. {item.parameters?.count ? `0/${item.parameters?.count}` : ''}
              </span>{' '}
              <span className="font-bold"></span>
            </div>
          ))}
          <div className="pt-5 flex gap-x-2 justify-between items-center">
            <div className="flex gap-x-2">
              {data?.rewards.map((item, index) => (
                <div
                  key={`reward_${index}`}
                  className="bg-[#3c291f] text-[#f9bb98] px-2  py-1  text-xs rounded-md gap-x-2 flex items-center"
                >
                  <div>
                    {item.minReceived == item.maxReceived
                      ? item.minReceived
                      : `${item.minReceived} - ${item.maxReceived}`}
                  </div>
                  <img src="/Currency_BitBerry.webp" alt="" className="h-4" />
                </div>
              ))}
            </div>

            <div className="text-[#a8663f] text-sm font-semibold border-2 py-1 px-4 rounded-full">
              {data?.type}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

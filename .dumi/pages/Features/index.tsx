import React from 'react';
import { Link } from 'dumi';
import './index.scss';

export default function Features() {
  const features = [
    {
      title: 'React',
      description: 'React 生态相关内容',
      link: '/react',
      emoji: '🤡',
    },
    { title: 'Node', description: 'Node 相关内容', link: '/node', emoji: '🍟' },
    {
      title: '工程化',
      description: '工程化相关内容',
      link: '/engineering',
      emoji: '🤺',
    },
    {
      title: '数据结构',
      description: '数据结构相关内容',
      link: '/data-structure',
      emoji: '🌳',
    },
    ,
    {
      title: '其他...',
      description: '无法明确分类内容',
      link: '/more',
      emoji: '🧿',
    },
  ];
  return (
    <div className="fbb-features">
      {features.map((feature) => (
        <div className="fbb-features__item">
          <div className="item__emoji">{feature?.emoji}</div>
          <div className="item__title">{feature?.title}</div>
          <div className="item__description">{feature?.description}</div>
          <div className="item__link">
            <Link to={feature?.link as string}>了解更多 🏃‍♀️</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

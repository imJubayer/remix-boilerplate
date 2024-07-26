import { useEffect, useState } from "react";
import "./pricerange.css";

export default function PriceRange() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const priceGap = 1000;
  const maxRangeValue = 10000;

  useEffect(() => {
    const range = document.querySelector(".slider .progress") as HTMLElement;
    if (range) {
      range.style.left = (minPrice / maxRangeValue) * 100 + "%";
      range.style.right = 100 - (maxPrice / maxRangeValue) * 100 + "%";
    }
  }, [minPrice, maxPrice]);

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      if (maxPrice - value >= priceGap) {
        setMinPrice(value);
      }
    } else if (type === 'max') {
      if (value - minPrice >= priceGap) {
        setMaxPrice(value);
      }
    }
  };

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      if (maxPrice - value >= priceGap) {
        setMinPrice(value);
      } else {
        setMinPrice(maxPrice - priceGap);
      }
    } else if (type === 'max') {
      if (value - minPrice >= priceGap) {
        setMaxPrice(value);
      } else {
        setMaxPrice(minPrice + priceGap);
      }
    }
  };

  return (
    <div className="price_range_slector">
      <div className="slider">
        <div className="progress"></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max={maxRangeValue}
          value={minPrice}
          step="100"
          onChange={(e) => handlePriceInput(e, 'min')}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max={maxRangeValue}
          value={maxPrice}
          step="100"
          onChange={(e) => handlePriceInput(e, 'max')}
        />
      </div>

      <div className="price-input">
        <div className="field">
          <input type="number" className="input-min" value={minPrice} onChange={(e) => handleRangeInput(e, 'min')}/>
        </div>
        <div className="field">
          <input type="number" className="input-max" value={maxPrice} onChange={(e) => handleRangeInput(e, 'max')}/>
        </div>
      </div>
    </div>
  );
}

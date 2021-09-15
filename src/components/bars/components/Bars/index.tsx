import {useRef, useEffect} from 'react';

import {Canvas} from './styled';

import {SortingStage} from 'context/sorting';
import {useSorting, useSortingKeyframes} from 'hooks';

import colors from 'styles/colors';

class Bar {
  x: number;
  y: number;
  width: number;
  height: number;
  isCompared: boolean;
  context: CanvasRenderingContext2D;

  private static renderingContext: CanvasRenderingContext2D | null = null;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    isCompared: boolean = false
  ) {
    if (!Bar.renderingContext) throw new Error(
      'No rendering context defined'
    );

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isCompared = isCompared;
    this.context = Bar.renderingContext;
  }

  static set context(context: CanvasRenderingContext2D | null) {
    Bar.renderingContext = context;
  }

  render() {
    const gradient = this.context.createLinearGradient(
      this.x, this.y, this.x, this.y + this.height
    );
    const gradientColor = this.isCompared ? colors.sandyBrown : colors.tiara;

    /**
     * Use zero HEX alpha value inside the template literal to prevent
     * the gradient from having a blackish tone on the transparent end.
     */
    gradient.addColorStop(0, `${gradientColor}00`);
    gradient.addColorStop(1, gradientColor);
    this.context.fillStyle = gradient;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const Bars = () => {
  const {
    array, 
    arrayLength: barCount,
    changeLog,  
    currentIteration, 
    sortingStage,
  } = useSorting();
  const randomNumbers = sortingStage !== SortingStage.Idle 
    && changeLog 
    && currentIteration
    ? changeLog[currentIteration].array : array;

  const canvasRef = useRef<
    HTMLCanvasElement & {
      canvasWidth: number;
      canvasHeight: number;
      context: CanvasRenderingContext2D | null;
    }
  >(null);
  const barsRef = useRef<Bar[] | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvasRef.current.context = context;

    if (!context) {
      throw new Error(
        '\'2d\' context is not supported, or the canvas has already been initialized with another context type'
      );
    }

    const canvasBoundingClientRect = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio;
    const canvasWidth = canvasBoundingClientRect.width;
    const canvasHeight = canvasBoundingClientRect.height;

    canvasRef.current.canvasWidth = canvasWidth;
    canvasRef.current.canvasHeight = canvasHeight;
    canvas.width = canvasWidth * devicePixelRatio;
    canvas.height = canvasHeight * devicePixelRatio;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const {canvasWidth, canvasHeight, context} = canvasRef.current;

    Bar.context = context;

    const gap = 40 / barCount * canvasWidth / 100;
    const barWidth = canvasWidth / barCount - (gap - gap / barCount);

    context?.clearRect(0, 0, canvasWidth, canvasHeight);

    barsRef.current = randomNumbers.map((randomNumber, index) => {
      const position = {
        x: barWidth * index + gap * index,
        y: canvasHeight,
      };

      const barHeight = -canvasHeight * randomNumber;

      const isCompared = Boolean(
        sortingStage === SortingStage.InProgress 
        && changeLog !== null 
        && currentIteration !== null 
        && changeLog[currentIteration]?.comparisonIndexes.includes(index)
      );

      const bar = new Bar(
        position.x, position.y, barWidth, barHeight, isCompared
      );
        
      bar.render();

      return bar;
    });
  });

  useSortingKeyframes();

  return <Canvas ref={canvasRef}/>;
}

export default Bars;
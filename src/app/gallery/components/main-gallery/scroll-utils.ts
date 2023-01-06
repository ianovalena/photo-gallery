import { debounceTime, Observable, Subject } from 'rxjs';

export function createScrolledDownSubscription(destroyNotifier: Subject<boolean>): Observable<boolean> {
  const scrolledDown: Subject<boolean> = new Subject<boolean>();
  const handleScroll = () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) scrolledDown.next(true);
  }

  window.addEventListener('scroll', handleScroll);
  destroyNotifier.subscribe(() => {
    window.removeEventListener('scroll', handleScroll);
    scrolledDown.complete();
  });

  return scrolledDown.asObservable().pipe(debounceTime(300));
}

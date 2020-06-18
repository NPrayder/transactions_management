import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Transaction } from '../models/transaction.interface';
import { environment } from '../../../../../environments/environment';
import { FlowStats } from '../../../../shared/core/models/flow-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: ReplaySubject<Transaction[]>;

  constructor(private httpClient: HttpClient) {
    this.transactions = new ReplaySubject<Transaction[]>(1);
    this.requestTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions.next(transactions);
      });
  }

  requestTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(environment.transactionURL);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  getFlow(bankName?: string): Observable<FlowStats> {
    return this.httpClient.get<FlowStats>(`${environment.statsURL}?${bankName ? 'bankName=' + bankName : ''}`);
  }
}
